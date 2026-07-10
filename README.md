# HoBom Frontend

> Desktop application built with React 19 + TypeScript + Vite, following Feature-Sliced Design (FSD) architecture.

---

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite** — build & dev server
- **StyleX** — styling for the in-house design system (`hobom-design-system`)
- **React Router DOM** — client-side routing
- **React Hook Form** + **`hobom-schema`** — form management & validation
- **Recharts** — data visualization
- **Tiptap** — rich text editor

---

## Monorepo Structure

pnpm workspace monorepo with the following packages:

```
apps/
  hobom-system/          # Main backoffice application

packages/
  hobom-data/            # Data fetching library (custom React Query alternative)
  hobom-schema/          # Runtime validation library (custom Zod alternative)
  hobom-utils/           # Functional utility library (pipe, map, filter, etc.)
  hobom-design-system/   # Shared UI components, icons, date pickers
```

The in-house `hobom-data` and `hobom-schema` are a deliberate choice — see
[ADR 0001](./docs/adr/0001-in-house-data-and-schema-libraries.md) for the
rationale, costs, and the criteria for replacing them.

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

---

## Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start hobom-system dev server                    |
| `pnpm build`         | Build hobom-system for production                |
| `pnpm typecheck`     | Run TypeScript type checking across all packages |
| `pnpm lint`          | Run ESLint across all packages                   |
| `pnpm test`          | Run Vitest across all packages                   |
| `pnpm test:coverage` | Run tests with coverage                          |
| `pnpm format`        | Format code with Prettier                        |
| `pnpm knip`          | Find unused dependencies and exports             |

---

## Architecture

This project follows **Feature-Sliced Design (FSD)**:

```
src/
  apps/        # App-level composition (router, providers)
  pages/       # Route-level components
  widgets/     # Page section compositions
  features/    # User interactions and business scenarios
  entities/    # Domain models and data access
  shared/      # Reusable utilities, UI, config (no slices)
```

### Import Rules

Each layer can only import from layers below it:

`apps` > `pages` > `widgets` > `features` > `entities` > `shared`

Cross-slice imports within the same layer are forbidden (enforced by custom ESLint rule).
