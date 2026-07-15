# hobom-system

The internal operations platform — a single desktop app that hosts the tooling
the team runs on. It bundles several domains behind one shell:

- **Projects** — backlog, board, kanban, issues, sprints, project dashboards and settings
- **Wiki** — spaces and pages with an editor, version history, comments, labels, trash, and search
- **Studio** — a design-to-code canvas with layers, an inspector, an insert palette, and a code panel
- **Privacy-law knowledge base** — study, exams, version diffs, a document viewer, and a Q&A chat
- **Operations dashboards** — system health, logs, error monitoring, DLQ management, daily todos, notifications, and messaging
- **Admin & misc** — pending-user approvals, menu recommendation/pick, scheduled ("future") messages, and notes

Built on the shared HoBom stack, desktop-first.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **StyleX** for styling — compose the design system, no bespoke CSS
- **hobom-design-system** (`Hb.*`), **hobom-data** (fetching/caching),
  **hobom-schema** (validation), **hobom-utils** (helpers)
- **MSW** for mocked API scenarios, **knip** for dead-code detection
- **Feature-Sliced Design** with custom import-boundary lint rules

## Getting started

```bash
pnpm install                      # from the monorepo root
pnpm --filter hobom-system dev    # Vite dev server
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
| `knip` | Report unused files/exports/dependencies |
| `preview` | Serve the production build |

```bash
pnpm --filter hobom-system typecheck
pnpm --filter hobom-system lint
pnpm --filter hobom-system test -- --run
```

## Architecture (FSD)

Layers, from top to bottom — a layer may only import from the ones below it, and
cross-slice imports within a layer are forbidden (enforced by
`eslint-rules/fsd-boundaries.js`):

| Layer | Contents |
| --- | --- |
| `apps` | Router, providers, shell layout (`apps/ui`) |
| `pages` | Route screens per domain (`project-*`, `wiki-*`, `studio-*`, `privacy-law-*`, `dashboard-*`, `admin-users`, `message*`, `note`, …) |
| `widgets` | Composite blocks: per-domain workspaces (`kanban-board-workspace`, `wiki-page-view-workspace`, `canvas`, `inspector`, `notification-center`, …) |
| `features` | User actions (`create-issue`, `kanban-board`, `wiki-page-editor`, `privacy-law-*`, `send-future-message`, `manage-pending-users`, …) |
| `entities` | Domain models + API + anti-corruption libs (`project`, `issue`, `sprint`, `wiki-page`, `wiki-space`, `document`, `privacy-law`, `notification`, `user`, `dlq`, `log`, …) |
| `shared` | Cross-cutting `api` / `config` / `lib` / `model` / `ui` segments (no slices) |

Conventions: business logic lives in custom hooks (`model/`), pure functions in
`lib/` with co-located `*.spec.ts`, and UI renders only. New shared UI is added
to the design system, not hand-rolled here. See the `hobom-ds`, `hobom-data`,
`hobom-schema`, and `hobom-utils` skills under `.claude/skills/` for the package
APIs, and `hobom-fsd` for the boundary rules.
