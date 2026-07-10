# 2. Slice public API and import boundaries

- Status: Accepted
- Date: 2026-07-11
- Deciders: HoBom frontend

## Context

Two import conventions had spread through the app without being written down or
enforced, so they were eroding at the edges:

- **Deep imports** into another slice's internals (`@/entities/x/model/foo`,
  `@/features/y/ui/Component`) instead of going through the slice's public entry.
  A slice ends up with more than one de-facto public surface, and refactors
  inside it silently break distant callers.
- **Self-barrel imports** — a file importing its own slice's root barrel
  (`@/entities/daily-todo` from inside `entities/daily-todo/**`). The barrel
  re-exports the very file that imports it, so this is a circular dependency.
  The bundler tolerates it today, but a single change to export order can turn
  it into an `undefined`-at-evaluation bug.

The design system already, deliberately, keeps UI out of a slice's root barrel:
the root barrel is the model/logic API, and each slice exposes its components
through a separate `ui` barrel. That is a good split (it stops a feature that
only needs another slice's hooks from pulling in its whole component tree), but
it was never stated, so "two public entries" read as "deep imports are fine
anywhere".

## Decision

**A slice exposes at most two public entries, and nothing else is imported
across a slice boundary:**

1. `@/<layer>/<slice>` — the root barrel (`index.ts`): logic, models, queries,
   types.
2. `@/<layer>/<slice>/ui` — the UI barrel: the slice's components.

**Within a slice, imports are always relative** (`./`, `../`) — never the
`@/<own-slice>` alias, at any depth. This removes the self-barrel cycle and
keeps intra-slice wiring local and obvious.

**Sliceless layers (`shared`, `apps`) are addressed by segment** — `@/shared/ui`,
`@/shared/lib`, `@/shared/model`, etc. — since they have no slices and no single
barrel. Deep imports into their segments are expected and allowed.

## Enforcement

The custom `eslint-rules/fsd-boundaries.js` rule enforces this alongside the
existing layer/slice checks, on static imports, `export … from` re-exports, and
dynamic `import()`:

- `ownSliceAlias` — a file importing its own slice via `@/` (root or deeper).
- `deepImport` — a cross-slice import that reaches past the root barrel and the
  `ui` barrel into a slice's internals.

Both are covered by `src/test/fsd-boundaries.rule.spec.ts`.

## Consequences

- Each slice has a small, explicit contract; internal files can move freely
  behind the two barrels.
- The self-barrel circular-dependency class is gone and can't come back.
- Cost: adding a new cross-slice-visible symbol means exporting it from the
  slice's root or `ui` barrel — a deliberate, visible step, which is the point.
- If a slice genuinely needs a third public surface, that is a signal the slice
  is doing too much and should be split, not that the rule should gain an
  exception.
