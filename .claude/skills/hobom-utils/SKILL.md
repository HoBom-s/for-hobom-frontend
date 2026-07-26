---
name: hobom-utils
description: Use when importing from hobom-utils, reading source under packages/hobom-utils, or reaching for functional array/object/guard helpers (pipe, filter, map, groupBy, pick, isDefined, maskEmail…) — the data-last, tree-shakeable utility kit. Prefer these over hand-rolled loops or adding lodash.
---

# hobom-utils (Bom)

`hobom-utils` is HoBom's in-house, Remeda-style functional utility library:
data-last, tree-shakeable, fully typed, with **zero third-party runtime
dependency**. 52 helpers spanning arrays, objects, guards, math, flow control,
and PII masking. Before you write a `for` loop, a `.reduce`, or `import _ from
"lodash"`, check the catalog — the helper almost certainly exists.

```ts
import { pipe, filter, map, groupBy, isDefined } from "hobom-utils";

const names = pipe(
  users,
  filter((u) => u.active),
  map((u) => u.name),
);
```

## Golden rules

1. **Prefer these over hand-rolled loops or lodash.** Do not add lodash/ramda,
   and do not reinvent `groupBy`/`uniqBy`/`partition`/mask helpers inline. If a
   utility is genuinely missing, add it to the package (one folder per function
   under `src/packages/<name>/`, co-located `*.spec.ts`) rather than to an app.
2. **Data-last + `pipe` for chains.** Compose with `pipe(value, op1, op2, …)`
   using the data-last form of each op — no intermediate variables, no nested
   calls. Reach for the data-first form only for a genuine one-off.
3. **Import individually for tree-shaking.** `import { pipe, filter } from
   "hobom-utils"` (or the `Bom` namespace). `"sideEffects": false` + per-function
   modules mean only what you import ships.
4. **Let guards narrow.** `isDefined`, `isString`, `isNumber`, `isNotNull`,
   `isNullish`, `isTruthy` are type predicates — use them in `filter`/`when` so
   the result type narrows automatically instead of casting.

## Calling convention — data-first vs data-last

Most helpers are **dual**: the same name accepts either shape, resolved at
runtime by whether the first argument looks like data.

```ts
// data-first: pass the data as arg 1, get the result.
filter(users, (u) => u.active); // → User[]

// data-last: omit the data, get an operation (data) => result. For pipe.
const onlyActive = filter((u) => u.active); // → (users) => User[]
pipe(users, filter((u) => u.active));
```

Not everything is dual — three shapes exist:

- **Dual (data-first + data-last):** `map` `filter` `flatMap` `forEach` `reduce`
  `sortBy` `find` `findIndex` `take` `drop` `every` `some` `countBy` `groupBy`
  `partition` `uniqBy` `sum` `pick` `omit` `mapValues` `prop` `values` `add`
  `subtract` `clamp` `tap` `clone`.
- **`pipe`-oriented (returns an op, or takes data first):** `when` `conditional`
  — call `when(predicate, onTrue)` to get a `(data) => …` op, or
  `when(data, predicate, onTrue)` eagerly.
- **Unary / factory (no data-last form):** `uniq` `first` `last` `keys`
  `entries` `identity` `not` `constant` all the `isX` guards, and
  `maskEmail`/`maskName`/`maskPhone` take their argument directly.

`map`/`filter`/`forEach`/`tap` are additionally **lazy** inside `pipe` — a
single pass over the data instead of one array allocation per step.

## Most reached-for

| Need | Use |
| --- | --- |
| Transform each element | `map(fn)` |
| Keep matching (narrows) | `filter(pred)` |
| First match / its index | `find(pred)` · `findIndex(pred)` |
| Group into buckets | `groupBy(fn)` → `Record<string, T[]>` |
| Split by predicate | `partition(pred)` → `[pass, fail]` |
| Dedupe | `uniq(arr)` · `uniqBy(fn)` |
| Sort (immutable) | `sortBy(fn)` |
| Compose a chain | `pipe(value, op1, op2, …)` |
| Pluck a field | `prop("name")` / `map(prop("name"))` |
| Pick/drop object keys | `pick(keys)` · `omit(keys)` |
| Drop nullish (narrows) | `filter(isDefined)` |
| Conditional transform | `when(pred, onTrue)` |
| Clamp a number | `clamp({ min, max })` |
| Mask PII for logs/UI | `maskEmail` · `maskName` · `maskPhone` |

## Full catalog

All 52 functions grouped by category, each with its data-first and data-last
signatures and a terse example, live in
**[references/functions.md](references/functions.md)** — read that instead of
opening each `src/packages/<name>/<name>.ts`.

## Verify

```bash
pnpm --filter hobom-utils typecheck
pnpm --filter hobom-utils lint
pnpm --filter hobom-utils test
pnpm --filter hobom-utils test:coverage
```
