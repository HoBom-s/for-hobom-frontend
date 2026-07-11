# 3. TypeScript project references without composite; no Turborepo

- Status: Accepted
- Date: 2026-07-11
- Deciders: HoBom frontend

## Context

Two build-tooling questions were left implicit and read as half-finished:

- **Turborepo** — was the workspace meant to adopt it? There is no `turbo.json`,
  no `turbo` dependency, and no `.turbo` cache — it simply isn't used.
- **TypeScript project references** — the root `tsconfig.json` is a solution
  config that references the app and packages, but the referenced projects don't
  set `composite: true`, and `hobom-schema` was missing from the list. That
  looks broken, but `tsc -b` runs fine, which is confusing.

## Decision

**No Turborepo.** `pnpm -r --parallel` covers the current needs across five
packages; a task-graph runner with remote caching isn't justified at this size.

**Keep project references; do not enable `composite`.** Two concrete, tested
reasons:

1. TypeScript 5 does **not** require `composite` for references when the projects
   are `noEmit` (the shared base sets `noEmit: true`). `tsc -b` already gives
   incremental, typecheck-only builds without it.
2. Turning `composite` on forces declaration emit, which
   - conflicts with the app's bundler mode (`allowImportingTsExtensions`, which
     requires `noEmit`/`emitDeclarationOnly`), and
   - surfaces `TS2883` "inferred type is not portable" errors across the app's
     models, because they infer types from `hobom-schema`'s unexported internal
     schema classes.

`hobom-schema` was **added to the root references** so the workspace graph is
complete.

The authoritative typecheck stays per-package: `pnpm -r --parallel typecheck`
(each package runs `tsc --noEmit`; the app runs `tsc -b` over its own
app/node/spec split). The root references exist for editor cross-package
awareness and an optional `tsc -b` from the root.

## Consequences

- The build config is now consistent and complete (schema included), and its
  intent is documented rather than looking half-migrated.
- We forgo emitted `.d.ts` and true composite incrementality. If we ever need
  them, the prerequisites are: make `hobom-schema`'s inferred types portable
  (export the schema classes or annotate the models) and drop
  `allowImportingTsExtensions` from the app — revisit then.
- If the build graph grows enough that `pnpm -r` parallelism or CI time hurts,
  reconsider Turborepo (or `tsc -b` caching) at that point.
