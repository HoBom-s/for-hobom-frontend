# hobom-design-system

The design system for HoBom. It provides design tokens, a themed component
library, and higher-level composed patterns used across the product.

Today it is implemented on top of MUI, but MUI is treated as an internal
detail. The public surface is the `Hb.*` component namespace and the token
layer — the long-term direction is to replace MUI with headless primitives
(Radix) while keeping this surface stable.

## Installation

This package is part of the pnpm workspace and is consumed via the workspace
protocol:

```jsonc
// consumer package.json
"dependencies": {
  "hobom-design-system": "workspace:*"
}
```

## Entry points

The package exposes three stable entry points. Import from these only — never
reach into internal paths.

| Import | Contents |
| --- | --- |
| `hobom-design-system` | `Hb` namespace, `theme`, patterns (`AppShell`, `Funnel`, …), layout constants |
| `hobom-design-system/icons` | Curated icon set (re-exported from `@mui/icons-material`) |
| `hobom-design-system/date-pickers` | Date picker components + adapter |

```tsx
import { Hb, theme, AppShell } from "hobom-design-system";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
```

## Folder structure

The package is organized by role. Each component lives in its own folder so
that parts, tests, and docs can be co-located as the catalog grows.

```
src/
  foundations/        Design foundation
    tokens/           primitive + semantic tokens, and the zero-pixel lock test
    theme/            MUI theme, sourced entirely from tokens
  components/         The Hb.* building blocks (one folder per component)
    Button/
      Button.tsx
      index.ts
    ...
    index.ts          Assembles the `Hb` namespace
  patterns/           Composed, higher-level pieces
    AppShell/ Funnel/ ErrorBoundary/ Sortable/ ...
  icons/              → hobom-design-system/icons
  date-pickers/       → hobom-design-system/date-pickers
  index.ts            Public barrel
```

- **foundations** — the source of truth for how everything looks.
- **components** — thin, themed building blocks. Composable, no business logic.
- **patterns** — assemblies of components that encode a reusable layout or flow.

## Design tokens

Colors, typography, radii, and shadows are defined once as tokens and consumed
by the theme. This is what makes theming and dark mode consistent, and what the
future Radix components will read directly.

Two layers:

- **primitives** (`foundations/tokens/primitives.ts`) — raw, scheme-independent
  atoms (`brand.500`, `radius.md`, `shadow.elevation1`). No meaning attached.
- **semantic** (`foundations/tokens/semantic.ts`) — roles that map to primitives
  per color scheme (`brand.main`, `bg.canvas`, `text.primary`). Components and
  the theme reference this layer, never primitives directly.

```
primitive            semantic              consumed by
brand.500 #4680ff →  color.brand.main  →   theme palette / components
```

`foundations/tokens/tokens.spec.ts` pins every semantic value to its exact hex,
so refactors that touch the theme cannot silently change the rendered output.

## Components — the `Hb` namespace

Components are exposed as a single namespace with compound sub-components.
Always use the namespaced form, never a bare component.

```tsx
<Hb.Button variant="primary">Save</Hb.Button>
<Hb.Button.Icon variant="danger"><DeleteOutlined /></Hb.Button.Icon>

<Hb.Dialog.Root size="md"> … </Hb.Dialog.Root>
<Hb.Card.Root> … </Hb.Card.Root>

<Hb.Table.Root>
  <Hb.Table.Head>…</Hb.Table.Head>
  <Hb.Table.Body>…</Hb.Table.Body>
</Hb.Table.Root>
```

Notes:
- `Hb.Button` variants are `"primary" | "secondary" | "danger" | "ghost"` — the
  system's own vocabulary, not MUI's `contained/text/outlined`.
- Compound components use `.Root` (e.g. `Hb.Dialog.Root`, `Hb.Card.Root`,
  `Hb.Tabs.Root`), not the bare name.

## Theming and dark mode

`theme` is an MUI theme built from the semantic tokens. Light/dark is switched
via the `data-mui-color-scheme` attribute (CSS variables). Wrap the app once:

```tsx
import { Hb, theme } from "hobom-design-system";

<Hb.ThemeProvider theme={theme}>
  <Hb.CssBaseline />
  <App />
</Hb.ThemeProvider>
```

Layout constants (`DRAWER_WIDTH`, `DRAWER_WIDTH_COLLAPSED`, `APPBAR_HEIGHT`) are
exported for shells that need to align with the drawer/appbar.

## Adding a component

1. Create a folder under `components/<Name>/`.
2. Add `<Name>.tsx` — a thin wrapper that maps the system's API to the
   implementation, styled via theme/tokens (see `Button/Button.tsx`).
3. Add `index.ts` with `export * from "./<Name>";`.
4. Register it in `components/index.ts` so it joins the `Hb` namespace.
5. Prefer the compound (`Root`/parts) shape for anything non-trivial.

Keep business logic out of components — extract it into hooks in the consuming
feature, and keep pure helpers unit-tested.

## Storybook

Components are developed and reviewed in isolation in Storybook. Stories are
co-located with each component as `<Name>.stories.tsx`. StyleX is wired into the
Storybook Vite builder (`.storybook/main.ts`), so token-styled components render
correctly.

```bash
pnpm --filter hobom-design-system storybook        # dev server on :6006
pnpm --filter hobom-design-system build-storybook  # static build
```

## Scripts

```bash
pnpm --filter hobom-design-system typecheck
pnpm --filter hobom-design-system test
pnpm --filter hobom-design-system test:coverage
```
