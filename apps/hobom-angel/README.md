# hobom-angel

The consumer-facing web app for animal fostering and adoption. Visitors browse
animals looking for a home, read a full profile, and submit an adoption or foster
application; shelters get a public microsite. Desktop-first, built on the shared
HoBom stack.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **StyleX** for styling — no bespoke CSS files; compose the design system
- **hobom-design-system** (`Hb.*`) for all UI, **hobom-data** for fetching/caching,
  **hobom-schema** for API-boundary validation, **hobom-utils** for helpers
- **MSW** for mocked API scenarios, **Playwright** for e2e
- **Feature-Sliced Design** with custom import-boundary lint rules

## Getting started

```bash
pnpm install                     # from the monorepo root
pnpm --filter hobom-angel dev    # Vite dev server
```

To run against mocked APIs (the MSW handlers under `src/mocks`):

```bash
VITE_ENABLE_MSW=true pnpm --filter hobom-angel dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `dev` | Vite dev server |
| `build` | Production build |
| `typecheck` | `tsc -b` |
| `lint` | ESLint (`--max-warnings=0`, incl. FSD boundaries) |
| `test` | Vitest unit/component tests |
| `test:coverage` | Vitest with coverage |
| `test:e2e` | Playwright end-to-end tests |
| `preview` | Serve the production build |

```bash
pnpm --filter hobom-angel typecheck
pnpm --filter hobom-angel lint
pnpm --filter hobom-angel test -- --run
```

E2e runs against a built preview with mocks enabled:

```bash
VITE_ENABLE_MSW=true pnpm --filter hobom-angel build
pnpm --filter hobom-angel preview --port 4173
pnpm --filter hobom-angel exec playwright test
```

## Architecture (FSD)

Layers, from top to bottom — a layer may only import from the ones below it, and
cross-slice imports within a layer are forbidden (enforced by
`eslint-rules/fsd-boundaries.js`):

| Layer | Contents here |
| --- | --- |
| `apps` | Router, providers, shell layout (`apps/ui`) |
| `pages` | Route screens: `landing`, `animals`, `animal-detail`, `apply-adoption`, `login`, `signup` |
| `widgets` | Composite blocks: `global-nav` |
| `features` | User actions: `browse-animals`, `animal-detail`, `apply-adoption`, `login`, `signup`, `session` |
| `entities` | Domain models + API + anti-corruption libs: `animal`, `adoption`, `questionnaire`, `user`, `auth` |
| `shared` | Cross-cutting `api` / `config` / `lib` / `model` / `ui` segments (no slices) |

Conventions: business logic lives in custom hooks (`model/`), pure functions in
`lib/` with co-located `*.spec.ts`, and UI components render only. New shared UI
is added to the design system, not hand-rolled here. See the `hobom-ds`,
`hobom-data`, `hobom-schema`, and `hobom-utils` skills under `.claude/skills/`
for the package APIs.
