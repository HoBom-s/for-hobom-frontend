# hobom-utils

An in-house, Remeda-style functional utility library for HoBom. Data-last,
tree-shakeable, fully typed — array, object, guard, math, flow, and PII-masking
helpers with **zero third-party runtime dependency**. Reach for these instead of
hand-rolling loops or pulling in lodash.

## Why it exists

- **No lodash.** One less dependency to audit and version. The whole kit is
  authored in-house and lives in the workspace.
- **Tree-shakeable.** `"sideEffects": false` plus per-function modules — import
  three helpers and only three ship to the bundle.
- **Data-last, built for `pipe`.** Curried helpers compose left-to-right without
  intermediate variables, the same ergonomics as Remeda.
- **Typed narrowing.** Guards (`isDefined`, `isString`, …) narrow types, and
  `filter`/`find`/`partition` propagate `value is S` predicates through to the
  result type.

## Installation

Part of the pnpm workspace; consumed via the workspace protocol:

```jsonc
// consumer package.json
"dependencies": {
  "hobom-utils": "workspace:*"
}
```

## Import styles

Two ways to import — both tree-shake identically. Prefer whichever reads best.

```ts
// 1. Named imports (recommended) — only what you use is bundled.
import { pipe, filter, map, groupBy, isDefined } from "hobom-utils";

// 2. Namespace — grouped under `Bom` to avoid clashing with local names.
import { Bom } from "hobom-utils";
Bom.pipe(users, Bom.filter(isActive), Bom.map(Bom.prop("name")));
```

## Quick start

Most helpers are **dual**: call data-first `filter(arr, fn)` directly, or
data-last `filter(fn)` to get a `(arr) => …` operation for `pipe`.

```ts
import { pipe, filter, map, sortBy, uniqBy, isDefined } from "hobom-utils";

interface User {
  id: number;
  name: string;
  age: number;
  team: string | null;
}

// pipe: value first, then a chain of data-last operations.
const names = pipe(
  users,
  filter((u: User) => u.age >= 18),
  uniqBy((u) => u.id),
  sortBy((u) => u.age),
  map((u) => u.name),
);

// Data-first, one-off — no pipe needed.
const adults = filter(users, (u) => u.age >= 18);

// Guards narrow types.
const teams = users.map((u) => u.team).filter(isDefined); // string[]
```

## At a glance

| Category | Functions |
| --- | --- |
| Collections | `map` `filter` `find` `findIndex` `reduce` `forEach` `every` `some` `flatMap` `partition` `countBy` `groupBy` `sortBy` `uniq` `uniqBy` `take` `drop` `first` `last` |
| Objects | `pick` `omit` `keys` `values` `entries` `mapValues` `prop` |
| Guards | `isArray` `isDate` `isDefined` `isEmpty` `isFunction` `isNotNull` `isNullish` `isNumber` `isString` `isTruthy` |
| Function / flow | `pipe` `curry` `identity` `constant` `conditional` `when` `tap` `not` |
| Math | `add` `subtract` `sum` `clamp` |
| PII masking | `maskEmail` `maskName` `maskPhone` |
| Misc | `clone` |

Full catalog with every signature (data-first + data-last) and an example per
function: **[.claude/skills/hobom-utils/references/functions.md](../../.claude/skills/hobom-utils/references/functions.md)**.

## Scripts

```bash
pnpm --filter hobom-utils typecheck
pnpm --filter hobom-utils lint
pnpm --filter hobom-utils test
pnpm --filter hobom-utils test:coverage
```
