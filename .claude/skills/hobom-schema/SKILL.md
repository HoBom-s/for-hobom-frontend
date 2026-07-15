---
name: hobom-schema
description: Use when importing from hobom-schema, reading source under packages/hobom-schema, or defining/validating runtime schemas with HoBomSchema.object/string/enum/array or parse/safeParse/Infer — the Zod-like validation kit used for API-boundary parsing.
---

# hobom-schema

`hobom-schema` is a tiny, dependency-free runtime validation kit — a Zod-like
API for describing the shape of untrusted data and turning it into typed,
validated values. It ships only the primitives it needs: schema builders,
`parse` / `safeParse`, and the `Infer` type helper. Import everything from the
package root; never reach into internal paths.

```ts
import { HoBomSchema, type Infer } from "hobom-schema";
import type { Schema, SafeParseResult, ValidationIssue } from "hobom-schema";
import { SchemaError } from "hobom-schema";

const animalSchema = HoBomSchema.object({
  id: HoBomSchema.number(),
  name: HoBomSchema.string().min(1),
  status: HoBomSchema.enum(["protecting", "adopted"] as const),
});

type Animal = Infer<typeof animalSchema>;
```

## Golden rules

1. **Validate at the boundary.** Untrusted data (API responses, form input,
   `localStorage`) gets a schema at the edge, then flows inward as a typed
   value. Don't sprinkle `as` casts or ad-hoc `typeof` checks downstream.
2. **Derive types with `Infer`, never hand-write them.** `type T = Infer<typeof
   schema>` keeps the runtime schema and the static type in lockstep — one
   source of truth. Writing a matching `interface` by hand invites drift.
3. **Prefer `safeParse` for advisory boundaries, `parse` for strict ones.** At
   an API edge where backend drift shouldn't crash the screen, branch on
   `safeParse`'s result (or use the app's `parseResponse`). Use `parse` when a
   mismatch is a genuine programmer error you want to throw on.
4. **Compose, don't extend the kit.** The validator set is intentionally small
   (`.min` / `.max` / `.regex` / `.positive`). For anything more specific, reach
   for `.regex(...)` — don't add `.email()`/`.url()` to the package.
5. **Chain returns a new schema.** Validators are immutable; `.min(1)` yields a
   fresh schema. Assign the chained result — never assume the base is mutated.

## API catalog

### Builders — `HoBomSchema.*`

| Builder | Accepts | `Infer` type |
| --- | --- | --- |
| `.string()` | a `string` | `string` |
| `.number()` | a finite `number` (rejects `NaN` / `Infinity`) | `number` |
| `.boolean()` | a `boolean` | `boolean` |
| `.date()` | a `Date.parse`-able **string**, kept as a string | `string` |
| `.enum(values)` | a `string` in `values` (pass `as const`) | union of `values` |
| `.object(shape)` | a non-null, non-array object | `{ [K]: Infer<shape[K]> }` |
| `.array(element)` | an array of `element` | `Infer<element>[]` |

### Validators (chainable; each takes an optional `message`)

| Schema | Validators |
| --- | --- |
| `string()` | `.min(n)`, `.max(n)`, `.regex(pattern)` |
| `number()` | `.min(n)`, `.max(n)`, `.positive()` |
| others | none |

`enum()` also exposes a read-only `.options` getter (the allowed values).

### Base methods (on every schema)

| Method | Behavior |
| --- | --- |
| `.parse(input)` | Returns the typed value, or **throws** `SchemaError`. |
| `.safeParse(input)` | Returns `SafeParseResult<T>` — never throws. |
| `.optional()` | Passes `undefined` through → `T \| undefined`. |
| `.nullable()` | Passes `null` through → `T \| null`. |

`.optional()` = `undefined` only; `.nullable()` = `null` only. Distinct — chain
both if a field can be either.

### Result and error shapes

```ts
type SafeParseResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: { readonly issues: readonly ValidationIssue[] } };

interface ValidationIssue {
  readonly message: string;
}
```

`SchemaError extends Error` carries the same `.issues`; its message is every
issue joined by `, `. Issue messages are path-prefixed as they bubble up —
object fields with `"<key>: "`, array items with `"[<index>]: "`.

### Example — parse vs safeParse

```ts
// strict: throws SchemaError on mismatch
const animal = animalSchema.parse(payload);

// advisory: branch on the result
const result = animalSchema.safeParse(payload);
if (result.success) {
  use(result.data); // Animal
} else {
  const detail = result.error.issues.map((i) => i.message).join("; ");
}
```

## `object()` strips unknown keys

`object()` reads only the keys in its `shape`; extra input keys are **dropped**
(output is built on a fresh `Object.create(null)`). There is no
strict/passthrough mode. A missing key is validated as `undefined`, so mark
possibly-absent fields `.optional()`.

## The `parseResponse` boundary (app-owned, not in this package)

This package does **not** export `parseResponse`. The Angel app wraps these
primitives at its API edge in
`apps/hobom-angel/src/shared/api/parse-response.api.ts`:
`parseResponse(schema, context)` runs `safeParse`, and on a mismatch reports the
contract violation and passes the raw payload through instead of throwing
(advisory validation — backend drift is logged, not fatal). Use `parseResponse`
in the app's API layer; use `parse` / `safeParse` directly for strict
validation anywhere.

## Verify

```bash
pnpm --filter hobom-schema typecheck
pnpm --filter hobom-schema lint
pnpm --filter hobom-schema test
pnpm --filter hobom-schema test:coverage
```
