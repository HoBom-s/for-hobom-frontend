# 1. In-house data-fetching and schema libraries

- Status: Accepted
- Date: 2026-07-10
- Deciders: HoBom frontend

## Context

The frontend ships two hand-written libraries that stand in for well-known
community packages:

- **`hobom-data`** — a data-fetching/caching layer in the shape of TanStack
  Query (React Query). It provides a query cache, `useQuery` /
  `useSuspenseQuery` / `useInfiniteQuery` / `useMutation` / `useQueries`,
  `staleTime` / `gcTime`, retry with backoff, refetch-on-focus/reconnect,
  structural sharing, query invalidation, and request cancellation.
- **`hobom-schema`** — a runtime validation layer in the shape of Zod. It
  provides `string` / `number` / `boolean` / `date` / `enum` / `object` /
  `array` builders with `optional` / `nullable`, and `parse` / `safeParse`.

These were not written down as a decision, which makes them easy to mistake for
accidental complexity. A review flagged exactly that: re-implementing libraries
the community has hardened over years is a cost that compounds, and two concrete
correctness gaps had already surfaced (invalidation not marking inactive queries
stale; `cancelQueries` not aborting the actual fetch). This ADR records why the
in-house libraries exist, what they cost, and the criteria for replacing them.

## Decision

Keep both libraries in-house, under the following conditions:

1. **They stay small and owned.** The value is a tiny, dependency-free surface
   we fully understand and can shape to this codebase (compound-component and
   Result-style APIs, the `--hb-*`/FSD conventions, no transitive bloat). If a
   feature would require re-deriving a genuinely hard part of React Query or Zod
   (cache normalization, a full type system, devtools), that is a signal to stop
   extending and reach for the real thing instead.
2. **Correctness gaps are treated as bugs, with tests.** The known corner cases
   the community already solved are our liability. Each one we hit gets a
   regression test, not a workaround. (See "Known limitations".)
3. **New capability is added only when a real feature needs it**, never
   speculatively.

## Consequences

### Positive
- Zero runtime dependencies for data fetching and validation; small bundle and
  no version-churn/CVE surface from those trees.
- Full control of the API and behavior; the libraries match the project's
  idioms exactly and are trivial to step through when debugging.
- Complete ownership of the code, which suits a codebase that is deliberately
  built from primitives.

### Negative / costs
- We re-tread corner cases that React Query and Zod hardened over years. This is
  the core risk and it is real — it has already produced correctness bugs.
- Contributors familiar with the standard libraries must learn ours.
- No ecosystem: no devtools, no community fixes, no plugins.

### Known limitations (as of this ADR)
- **`hobom-schema` is not a full type system.** It has no `record`, `union`,
  `lazy`, `transform`, or `refine`. Payloads with a `Record<string, unknown>`
  (e.g. the DLQ detail `payload`) cannot be modeled.
- **Response schemas are advisory, not strict.** The app's TypeScript response
  types do not always match the wire (VO-wrapped fields, under-declared
  nullability), so a type-derived schema rejects valid data. `parseResponse`
  therefore *reports* mismatches via `reportError` and passes the payload
  through rather than throwing. The mismatch logs are the worklist for
  tightening the types/schemas; individual endpoints can be promoted to strict
  once verified against real responses.
- `hobom-data` has no cache normalization, no offline/persistence, and no
  devtools.

### Fixes already made (the review's action items)
- Invalidated queries are now marked stale so unobserved ones refetch on
  remount, instead of serving up-to-`staleTime` stale data (with tests).
- Cancellation signals are threaded `queryFn → fetch → httpClient`, and the
  HTTP client composes the caller's signal with its timeout, so `cancelQueries`
  aborts in-flight requests (with tests).

## Reconsider / exit criteria

Migrate the affected library to React Query or Zod when any of these become
true:

- We need a capability that is expensive and error-prone to re-implement
  correctly: cache normalization, request deduplication guarantees across
  observers, offline persistence, schema `union`/`discriminatedUnion`/`refine`,
  or codegen from an API contract.
- Correctness bugs in the in-house code recur faster than we can add regression
  tests for them.
- The team grows to the point where onboarding cost of the custom libraries
  outweighs the ownership benefit.

The migration path is intentionally low-risk: both libraries mirror their
mainstream counterpart's API, so a swap is largely mechanical (`useQuery`,
`queryOptions`, `z.object` ↔ `HoBomSchema.object`, …).

## Alternatives considered

- **Adopt TanStack Query + Zod.** Battle-tested and full-featured; the default
  choice for most teams. Rejected *for now* in favor of the small, owned,
  dependency-free surface above — but this is the fallback the exit criteria
  point to.
