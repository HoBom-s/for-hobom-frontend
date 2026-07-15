# hobom-schema

A tiny, dependency-free runtime schema validation kit for HoBom — a Zod-like
API for describing the shape of untrusted data (API responses, form input) and
turning it into typed, validated values at runtime.

It ships only the primitives it needs: a handful of schema builders, `parse` /
`safeParse`, and a static type helper. No dependencies, no bundle weight beyond
what you import.

## Installation

This package is part of the pnpm workspace and is consumed via the workspace
protocol:

```jsonc
// consumer package.json
"dependencies": {
  "hobom-schema": "workspace:*"
}
```

## Import

Everything is exported from the package root — never reach into internal paths.

```ts
import { HoBomSchema, type Infer } from "hobom-schema";
import type { Schema, SafeParseResult, ValidationIssue } from "hobom-schema";
import { SchemaError } from "hobom-schema";
```

## Quick start

Define a schema by composing builders off the `HoBomSchema` namespace, then
validate a value with `parse` (throws) or `safeParse` (returns a result).

```ts
import { HoBomSchema, type Infer } from "hobom-schema";

const animalSchema = HoBomSchema.object({
  id: HoBomSchema.number(),
  name: HoBomSchema.string().min(1),
  status: HoBomSchema.enum(["protecting", "adopted"] as const),
  photos: HoBomSchema.array(HoBomSchema.string()),
  adoptedAt: HoBomSchema.string().nullable(),
});

// Derive the static type from the schema — single source of truth.
type Animal = Infer<typeof animalSchema>;
// {
//   id: number;
//   name: string;
//   status: "protecting" | "adopted";
//   photos: string[];
//   adoptedAt: string | null;
// }

// parse: returns the typed value, throws SchemaError on mismatch.
const animal = animalSchema.parse(payload);

// safeParse: returns a discriminated result, never throws.
const result = animalSchema.safeParse(payload);
if (result.success) {
  result.data; // Animal
} else {
  result.error.issues; // readonly ValidationIssue[]
}
```

`SchemaError` (thrown by `parse`) carries the same issues as its `.issues`
property, and its message is every issue message joined by `, `.

## API

### Builders — `HoBomSchema.*`

| Builder | Accepts | `Infer` type |
| --- | --- | --- |
| `HoBomSchema.string()` | a `string` | `string` |
| `HoBomSchema.number()` | a finite `number` (rejects `NaN` / `Infinity`) | `number` |
| `HoBomSchema.boolean()` | a `boolean` | `boolean` |
| `HoBomSchema.date()` | a date **string** (`Date.parse`-able); kept as a string | `string` |
| `HoBomSchema.enum(values)` | a `string` in `values` (pass `as const`) | union of `values` |
| `HoBomSchema.object(shape)` | a non-null, non-array object matching `shape` | `{ [K]: Infer<shape[K]> }` |
| `HoBomSchema.array(element)` | an array whose items each match `element` | `Infer<element>[]` |

### Validators (chainable, return a new schema)

Validators are immutable — each returns a fresh schema, so the base builder is
never mutated. Every validator takes an optional custom `message`.

| Schema | Validators |
| --- | --- |
| `string()` | `.min(n)`, `.max(n)`, `.regex(pattern)` |
| `number()` | `.min(n)`, `.max(n)`, `.positive()` |
| `boolean()`, `date()`, `enum()`, `object()`, `array()` | none |

There is no `.email()`, `.url()`, `.int()`, etc. — the set above is the whole
surface. Compose `.regex(...)` for anything more specific.

`enum()` also exposes a read-only `.options` getter returning the allowed values.

### Base methods (on every schema)

| Method | Behavior |
| --- | --- |
| `.parse(input)` | Returns the typed value, or **throws** `SchemaError`. |
| `.safeParse(input)` | Returns `SafeParseResult<T>` — never throws. |
| `.optional()` | Wraps the schema so `undefined` passes through as `undefined`. |
| `.nullable()` | Wraps the schema so `null` passes through as `null`. |

`.optional()` vs `.nullable()`: `optional` only lets `undefined` through
(`T | undefined`); `nullable` only lets `null` through (`T | null`). They are
distinct — pick the one that matches the wire contract, or chain both if a field
can be either.

### Result types

```ts
type SafeParseResult<T> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: { readonly issues: readonly ValidationIssue[] } };

interface ValidationIssue {
  readonly message: string;
}
```

Issue messages are path-prefixed as they bubble up: an object field prefixes
with `"<key>: "` and an array item with `"[<index>]: "`, so a nested failure
reads e.g. `photos: [0]: Expected string`.

## Object behavior — unknown keys are stripped

`object()` reads only the keys declared in its `shape`. Any extra keys on the
input are **dropped** from the output — the result is built on a fresh
`Object.create(null)` and only declared keys are copied over. There is no
`strict`/`passthrough` mode; unknown-key stripping is the only behavior.

A field is validated with `record[key]`, so a **missing** key is validated as
`undefined` — mark such fields `.optional()` if they may be absent.

## The API-boundary pattern (in the app, not here)

This package intentionally stops at the primitives (`parse` / `safeParse`). It
does **not** export a `parseResponse` helper.

The Angel app builds that boundary wrapper on top of these primitives in
`apps/hobom-angel/src/shared/api/parse-response.api.ts`. `parseResponse(schema,
context)` runs `schema.safeParse(data)` and, on a mismatch, reports the contract
violation (via `reportError`) and passes the raw payload through instead of
throwing — advisory validation, so backend drift is logged but never breaks the
screen. Reach for `parseResponse` in the app's API layer; reach for `parse` /
`safeParse` directly anywhere you want strict, throwing validation.

## Scripts

```bash
pnpm --filter hobom-schema typecheck
pnpm --filter hobom-schema lint
pnpm --filter hobom-schema test
pnpm --filter hobom-schema test:coverage
```
