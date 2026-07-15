# hobom-data

A lean, in-house data-fetching and caching library for HoBom — a small
TanStack-Query-shaped alternative.

## Why

We depend on very little of TanStack Query's surface, but pull in its full
runtime. `hobom-data` reimplements the parts we actually use — query cache,
staleness, dedup, invalidation, mutations, infinite/suspense variants — behind a
familiar API. That keeps the bundle small, the behavior ours to change, and the
migration cost near zero: the hook and option names mirror the ones the team
already knows.

The public surface is the `HoBom` namespace plus flat named exports (imported
directly to make migration mechanical). MUI-style, the cache client is called a
**DataLot**.

## Installation

Part of the pnpm workspace, consumed via the workspace protocol:

```jsonc
// consumer package.json
"dependencies": {
  "hobom-data": "workspace:*"
}
```

## Import

```ts
import { HoBom } from "hobom-data";
// or flat named exports (migration-friendly):
import { useQuery, useMutation, queryOptions, DataLot, DataLotProvider } from "hobom-data";
```

`HoBom.DataKernel.useQuery` and the flat `useQuery` are the same function.
`HoBom.DataLot` is the cache class with `.Provider`, `.queryOptions`,
`.mutationOptions`, and `.infiniteQueryOptions` attached as statics.

## Quick start

### 1. Wrap the tree in a provider

One `DataLot` instance per app. Pass it to the provider as `client`.

```tsx
import { DataLot, DataLotProvider } from "hobom-data";

const dataLot = new DataLot({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

function Root() {
  return (
    <DataLotProvider client={dataLot}>
      <App />
    </DataLotProvider>
  );
}
```

### 2. Read data with `useQuery`

```tsx
import { useQuery, queryOptions } from "hobom-data";

const shelterQuery = (id: string) =>
  queryOptions({
    queryKey: ["shelter", id],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/shelters/${id}`, { signal });
      return res.json() as Promise<Shelter>;
    },
  });

function ShelterName({ id }: { id: string }) {
  const { data, status, isError, error } = useQuery(shelterQuery(id));

  if (status === "pending") return <Spinner />;
  if (isError) return <ErrorText>{error.message}</ErrorText>;
  return <h1>{data.name}</h1>;
}
```

`useQuery` **does not throw** — you branch on `status` / `isError`. See gotchas.

### 3. Write data with `useMutation`

```tsx
import { useMutation, useDataLot } from "hobom-data";

function AdoptButton({ animalId }: { animalId: string }) {
  const dataLot = useDataLot();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => fetch(`/api/animals/${id}/adopt`, { method: "POST" }),
    onSuccess: () => dataLot.invalidateQueries({ queryKey: ["animals"] }),
  });

  return (
    <button disabled={isPending} onClick={() => mutate(animalId)}>
      Adopt
    </button>
  );
}
```

## API overview

| Export | Kind | Purpose |
| --- | --- | --- |
| `DataLot` | class | The cache client. `new DataLot({ defaultOptions })`. |
| `DataLotProvider` | component | Provides a `DataLot` via context. Prop: `client`. |
| `useDataLot()` | hook | Reads the `DataLot` from context (throws if unprovided). |
| `useQuery` | hook | Read a query. Returns state; **never throws**. |
| `useSuspenseQuery` | hook | Same, but suspends / throws to an `ErrorBoundary`. |
| `useQueries` / `useSuspenseQueries` | hook | Array of queries in one call. |
| `useInfiniteQuery` | hook | Paginated query with `pages` / `fetchNextPage`. |
| `useSuspenseInfiniteQuery` | hook | Suspense variant of the above. |
| `useMutation` | hook | Write. Returns `mutate` / `mutateAsync` + status. |
| `queryOptions` | fn | Typed, reusable query-options factory. |
| `mutationOptions` | fn | Typed, reusable mutation-options factory. |
| `infiniteQueryOptions` | fn | Typed infinite-query factory (`getNextPageParam` + `initialPageParam`). |

**`DataLot` cache operations** (via `useDataLot()`): `getQueryData`,
`setQueryData`, `invalidateQueries`, `prefetchQuery`, `cancelQueries`, `clear`.

## Gotchas

- **`useQuery` never throws.** Branch on `status === "pending" | "success" |
  "error"` (or `isError`) — the error is on `result.error`, not thrown. Use
  `useSuspenseQuery` if you want it thrown to a `<Suspense>` / `<ErrorBoundary>`.
- **`isLoading` is `false` on the very first render.** It is
  `status === "pending" && fetchStatus === "fetching"`, and the fetch only
  starts in an effect (after mount). For initial gating / auth guards, branch on
  **`status === "pending"`**, not `isLoading`.
- **Provider prop is `client`**, and `new DataLot(...)` takes
  `{ defaultOptions }`, not options directly.
- **`infiniteQueryOptions` requires `initialPageParam` and `getNextPageParam`.**

## Scripts

```bash
pnpm --filter hobom-data typecheck
pnpm --filter hobom-data lint
pnpm --filter hobom-data test
pnpm --filter hobom-data test:coverage
```
