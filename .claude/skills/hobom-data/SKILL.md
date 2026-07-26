---
name: hobom-data
description: Use when importing from hobom-data, reading source under packages/hobom-data, or working with useQuery/useMutation/useInfiniteQuery/queryOptions/DataLot — the in-house query cache & data-fetching hooks (a lean TanStack-Query alternative). Covers the suspense-vs-non-suspense choice, the isLoading-first-render gotcha, cache invalidation, and provider setup.
---

# hobom-data (DataLot)

`hobom-data` is a small in-house data-fetching + caching library shaped like
TanStack Query (query cache, staleness, dedup, invalidation, mutations,
infinite/suspense variants) but with only the surface we use. The cache client
is a **`DataLot`**. Hook and option names mirror TanStack Query, so most code
reads identically — but a few behaviors differ (see Gotchas), and getting those
wrong causes real bugs.

```ts
import { HoBom } from "hobom-data";
// or flat named exports (migration-friendly):
import { useQuery, useMutation, queryOptions, DataLot, DataLotProvider } from "hobom-data";
```

`HoBom.DataKernel.*` (hooks) and `HoBom.DataLot` (cache class, with `.Provider`
/ `.queryOptions` / `.mutationOptions` / `.infiniteQueryOptions` statics) are the
same functions as the flat exports.

## Golden rules

1. **`useQuery` never throws — branch on `status`.** `status === "pending" |
   "success" | "error"`. The error is on `result.error`. Only the `useSuspense*`
   hooks throw (to `<Suspense>` / `<ErrorBoundary>`).
2. **Never gate on `isLoading` for the first render.** It is
   `status === "pending" && fetchStatus === "fetching"` and is `false` before
   the fetch effect runs. Auth guards / initial gates branch on
   `status === "pending"`.
3. **Define options with the factories, reuse them.** `queryOptions(...)` /
   `mutationOptions(...)` / `infiniteQueryOptions(...)` return a typed object you
   pass to the hook, `prefetchQuery`, etc. Don't inline the same key/fn twice.
4. **One `DataLot` per app, provided via `DataLotProvider client={...}`.** Cache
   mutations (`invalidateQueries`, `setQueryData`, …) come from `useDataLot()`.

## Provider setup

```tsx
import { DataLot, DataLotProvider } from "hobom-data";

const dataLot = new DataLot({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

<DataLotProvider client={dataLot}>
  <App />
</DataLotProvider>
```

Note: `new DataLot({ defaultOptions })` (not options directly), and the provider
prop is **`client`**. `useDataLot()` throws if called outside the provider.

## Hooks & options catalog

### Option factories

```ts
// queryOptions<TData, TQueryKey>(opts): DefinedQueryOptions
queryOptions({
  queryKey: ["shelter", id] as const,
  queryFn: async ({ signal, queryKey }) => fetchShelter(id, signal),
  staleTime: 60_000, // optional; also gcTime, retry, retryDelay,
  //                    refetchOnWindowFocus, refetchOnReconnect, enabled
});

// mutationOptions<TData, TError, TVariables, TContext>(opts)
mutationOptions({
  mutationFn: (input: AdoptInput) => postAdopt(input),
  onMutate, onSuccess, onError, onSettled, // all optional
});

// infiniteQueryOptions<TData, TPageParam, TQueryKey>(opts)
infiniteQueryOptions({
  queryKey: ["animals", filter] as const,
  queryFn: ({ pageParam, signal }) => fetchAnimals({ cursor: pageParam, signal }),
  initialPageParam: 0,                                    // REQUIRED
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // REQUIRED; undefined = no more
});
```

### `useQuery(options): UseQueryResult`

Options: `QueryOptions` + `enabled?`, `select?: (data) => data`.
Result: `{ data, error, status, fetchStatus, isLoading, isFetching, isError,
isSuccess, refetch }`. **Does not throw.**

```tsx
const { data, status, isError, error } = useQuery(shelterQuery(id));
if (status === "pending") return <Spinner />;
if (isError) return <ErrorText>{error.message}</ErrorText>;
return <h1>{data.name}</h1>;
```

### `useSuspenseQuery(options): UseSuspenseQueryResult`

Options: `QueryOptions` minus `enabled`, plus `select?`.
Result: `{ data, error: null, status: "success", fetchStatus, isFetching,
refetch }`. **Suspends while pending, throws the error to an `ErrorBoundary`.**
`data` is always defined — no pending/error branch needed in the component.

```tsx
const { data } = useSuspenseQuery(shelterQuery(id)); // data: Shelter
```

### `useMutation(options): UseMutationResult`

Result: `{ data, error, variables, status, isIdle, isPending, isError,
isSuccess, mutate, mutateAsync, reset }`.
`mutate(vars, { onSuccess, onError, onSettled })` fires and forgets;
`mutateAsync(vars)` returns a promise. Per-call callbacks run in addition to the
option-level ones.

```tsx
const dataLot = useDataLot();
const { mutate, isPending } = useMutation({
  mutationFn: (id: string) => adopt(id),
  onSuccess: () => dataLot.invalidateQueries({ queryKey: ["animals"] }),
});
```

### `useInfiniteQuery(options): UseInfiniteQueryResult`

Options: `infiniteQueryOptions(...)`. Result includes `data:
{ pages, pageParams } | undefined`, `hasNextPage`, `isFetchingNextPage`,
`fetchNextPage`, plus the usual `status`/`isLoading`/etc. **Does not throw.**

```tsx
const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
  useInfiniteQuery(animalsInfinite(filter));
const rows = data?.pages.flatMap((p) => p.items) ?? [];
```

### `useSuspenseInfiniteQuery(options)`

Suspense variant. `data` always defined (`{ pages, pageParams }`); suspends /
throws like `useSuspenseQuery`.

### `useQueries({ queries: [...] })` / `useSuspenseQueries({ queries: [...] })`

Run an array of query options in one hook; returns a tuple of results
(non-suspense = `UseQueryResult[]`, suspense = `UseSuspenseQueryResult[]`).

### `useDataLot(): DataLot` — cache operations

- `getQueryData<T>(queryKey): T | undefined`
- `setQueryData<T>(queryKey, updater)` — value or `(old) => new`
- `invalidateQueries(filters?)` — mark stale + refetch active observers.
  `filters` is `{ queryKey? }`; omit to invalidate everything. (`invalidates`
  is the underlying alias.)
- `prefetchQuery(options)` — warm the cache (e.g. in a loader)
- `cancelQueries(filters?)` — abort in-flight fetches
- `clear()` — drop the whole cache

## Suspense vs non-suspense — which to pick

| Want | Use |
| --- | --- |
| Inline `if (status === "pending")` / `isError` branches in the component | `useQuery` / `useInfiniteQuery` |
| A parent `<Suspense fallback>` + `<ErrorBoundary>`, `data` always defined | `useSuspenseQuery` / `useSuspenseInfiniteQuery` |
| Conditional / lazy fetching (`enabled: false`) | `useQuery` only — suspense variants force `enabled: true` |

## Gotchas (these have bitten us)

- **`useQuery` never throws.** Read `result.error`; branch on `status` /
  `isError`. If you expected a try/catch or an `ErrorBoundary` to catch it,
  switch to `useSuspenseQuery`.
- **`isLoading` is `false` on the first render.** It's `status === "pending" &&
  fetchStatus === "fetching"`, and the fetch starts in an effect after mount. So
  on render #1 it's pending-but-not-fetching → `isLoading === false`. **Gate on
  `status === "pending"`**, never `isLoading`, for auth guards / initial spinners.
- **Suspense variants force `enabled: true`** and omit `enabled` from their
  options type. For conditional fetching use plain `useQuery` with `enabled`.
- **`infiniteQueryOptions` requires `initialPageParam` AND `getNextPageParam`;**
  `getNextPageParam` returning `undefined` means "no next page" (`hasNextPage`
  becomes `false`).
- **Provider prop is `client`; constructor takes `{ defaultOptions }`.** A bare
  `new DataLot(defaultOptions)` or `<DataLotProvider value=...>` is wrong.
- **`select` runs on `useQuery`/`useSuspenseQuery` only** (transform result data);
  it is not an option on the infinite hooks.

## Verify

```bash
pnpm --filter hobom-data typecheck   # tsc --noEmit
pnpm --filter hobom-data lint         # eslint --max-warnings=0
pnpm --filter hobom-data test         # vitest
```
