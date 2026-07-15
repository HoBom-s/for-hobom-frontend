# hobom-design-system — component index

Every export the app can use. Props listed are the notable ones; each component
also spreads standard DOM attributes onto its root unless noted. For the full
prop contract of a component, read its co-located `*.doc.ts`.

`import { Hb } from "hobom-design-system"` — access as `Hb.<Name>`.
Icons: `import { IconName } from "hobom-design-system/icons"` (see
`src/icons/generated.tsx`; add new ones with `createIcon`).

---

## Layout & primitives

- **`Hb.Box`** — polymorphic element. `component?` (default `"div"`), all HTML attrs. The escape hatch when no richer primitive fits.
- **`Hb.Stack`** — flexbox stack. `direction?` `"row" | "column" | "row-reverse" | "column-reverse"` (default `"column"`), `spacing?` (× 8px), `alignItems?`, `justifyContent?`, `flexWrap?`, `divider?` (element interleaved between children), `component?`.
- **`Hb.Grid`** — 12-column responsive grid. `container?`, `spacing?` (× 8px), `size?` number | `{ xs, sm, md, lg, xl }`. Parent has `container`; children carry `size`.
- **`Hb.Paper`** — surface. `variant?` `"elevation" | "outlined"`.
- **`Hb.Divider`** — hairline rule. `orientation?`, standard attrs.
- **`Hb.Text`** — typography. `variant?` `h1–h6 | subtitle1/2 | body1/2 | caption | overline | button | inherit` (default `body1`), `color?` (semantic role `"text.secondary" | "primary" | "error" | …` or any CSS color), `align?`, `noWrap?`, `gutterBottom?`, `fontWeight?`, `component?` (override the tag).

## Surfaces & containers

- **`Hb.Card`** = `{ Root, Content, Actions, Clickable }`. `Root.variant?` `"outlined" | "elevation"`. `Clickable` makes the whole surface a button (`onClick`).
- **`Hb.SectionCard`** — titled content block. `title?`, `description?`, `action?` (right-aligned header slot), `variant?` `"outlined" | "plain"` (default `outlined`). Renders `<section>`; header collapses when empty.
- **`Hb.Accordion`** = `{ Root, Summary, Details }`. `Root.variant?` `"outlined" | "elevation"`, controlled via `expanded`/`onChange`.
- **`Hb.Collapse`** — animated open/close container. `in?` (open), standard attrs.

## Composition patterns

- **`Hb.PageHeader`** — screen title block. `title` (required), `description?`, `actions?` (right slot), `breadcrumb?` (above title), `children?` (below, e.g. tabs/filters). Renders `<header>`.
- **`Hb.Breadcrumb`** = `{ Root, Item }`. `Root.separator?` (default `"/"`), `aria-label` default `"위치"`. `Item.current?` → `aria-current="page"` + primary weight. Put a router `<Link>` or `<a>` inside an `Item`.
- **`Hb.DescriptionList`** = `{ Root, Item }`. `Root.layout?` `"grid" | "stacked"` (default `grid`). `Item.term` (ReactNode) + children (the value). Term = secondary caption, value = primary body. Semantic `<dl>/<dt>/<dd>`.
- **`Hb.StatGroup`** = `{ Root, Item }`. `Root.columns?` number (grid of N; else flex-wrap). `Item.value` + `Item.label` — big value over small secondary label. Semantic `<dl>`.
- **`Hb.Gallery`** — photo gallery. `images: { src, alt? }[]` (required), `alt?` (base label fallback), `ratio?` (default `"4 / 3"`). Main image + thumbnail strip (thumbnails only when >1). Composes `Hb.Image`.

## Navigation

- **`Hb.Tabs`** = `{ Root, Item, Panel }`. `Root.value` + `onChange` (controlled). `Item.value?` (falls back to index), `label`, `icon?`, `iconPosition?`, `disabled?`. `Panel.value` (shown when active), `keepMounted?`. role=tablist/tab/tabpanel.
- **`Hb.Menu`** = `{ Root, Item }`. `Root` controlled list (`Omit onChange`), `Item.onClick` via context. Popover-style menu.
- **`Hb.List`** = `{ Root, Item, ItemText, ItemIcon, ItemButton, ItemAvatar, Subheader }`. Semantic `<ul>` list with rich rows.
- **`Hb.Table`** = `{ Container, Root, Head, Body, Row, Cell }`. `Root.size?` `"small" | "medium"`, `Container.variant?`, `Cell.align?`. Semantic `<table>` scaffolding.
- **`Hb.Pagination`** — page controls. `count`, `page`, `onChange`, `size?` `"small" | "medium"`.
- **`Hb.Link`** — styled `<a>`. `color?`, `underline?`, standard anchor attrs. (For SPA routing wrap a router `<Link>` or use `component`.)

## Inputs & forms

- **`Hb.Button`** — `variant?` `"primary" | "secondary" | "danger" | "ghost"`, `size?`, `fullWidth?`, `loading?`, `disabled?`, `startIcon?`/`endIcon?`. **`Hb.Button.Icon`** — icon-only, `variant?` `"default" | "danger"`, `size?`.
- **`Hb.ButtonBase`** — unstyled button primitive (ripple/focus handling) to build on.
- **`Hb.TextField`** — `size?` `"small" | "medium"`, `multiline?`, `error?`, `startAdornment?`/`endAdornment?`, label/helper via `Hb.Form`. Standard input attrs (`Omit size/ref`).
- **`Hb.InputBase`** — bare input (no chrome) for custom fields.
- **`Hb.Checkbox`** — `size?`, standard input attrs (`Omit size/type`).
- **`Hb.Radio`** = `{ Root, Group }`. `Group` controlled via `value`/`onChange`; `Root.size?`.
- **`Hb.ToggleButton`** + **`Hb.ToggleButtonGroup`** — `ToggleButton.variant?` `"outlined" | "segmented"`, `size?`, `selected`/`value`. Group manages exclusive/multi selection (segmented = the pill switch).
- **`Hb.Autocomplete`** — generic combobox `Autocomplete<T>`. `options`, `value`, `onChange`, `getOptionLabel`, `renderOption?`, `size?`.
- **`Hb.Form`** = `{ Control, Label, Helper, Select, Option, ControlLabel }`. Field scaffolding + a styled native-ish `Select`/`Option`. `Control.size?`, `Select` controlled.

## Feedback & status

- **`Hb.Alert`** — `variant?` `"standard" | "outlined"`, `severity` (info/success/warning/error), standard attrs.
- **`Hb.Badge`** — count/dot overlay. `badgeContent`, `color?` `"primary" | "error"`, `max?`.
- **`Hb.Chip`** — tag/pill. `label`, `variant?` `"filled" | "outlined" | "soft"`, `color?`, `size?`, `onDelete?`, `color` accepts any CSS color for a tonal tint.
- **`Hb.Progress`** = `{ Circular, Linear }`. `Circular.size?` number|string. `Linear.variant?` `"indeterminate" | "determinate"`, `value?`, `color?`.
- **`Hb.Skeleton`** — `variant?` `"text" | "circular" | "rectangular"`, `width`/`height`. (Also `HoBomSkeleton.Card` / `.List` pattern presets.)
- **`Hb.Tooltip`** — `title`, `placement?`, wraps a child trigger.

## Media

- **`Hb.Image`** — responsive image with reserved aspect frame, shimmer→fade, lazy/priority, fallback. `src?`, `alt` (required), `ratio?` (default `"1 / 1"`), `priority?`, `objectFit?` `"cover" | "contain"`, `fallback?`.
- **`Hb.Avatar`** — `variant?` `"circular" | "rounded" | "square"`, `src?`, `alt?`, children (initials).

## Overlays

- **`Hb.Dialog`** = `{ Root, Title, Content, Actions, ContentText }`. `Root.open`, `onClose`, `size?` `"xs" | "sm" | "md" | "lg"` (maps to max-width).
- **`Hb.Drawer`** — side sheet. `open`, `onClose`, `anchor?`.
- **`Hb.Popover`** — anchored floating surface. `open`, `anchorEl`, `onClose`, placement.

## Infra (providers / global)

- **`Hb.CssBaseline`** — global reset.
- **`Hb.GlobalStyles`** — inject global CSS.
- **`Hb.ColorSchemeProvider`** — light/dark scheme context. Also exported from root:
  `ColorSchemeVars`, `useColorScheme`, `useColorSchemeStyles`, `ColorSchemeProvider`.

---

## Package-root patterns (NOT under `Hb.*`)

Imported directly: `import { AppShell, EmptyState } from "hobom-design-system"`.

- **`AppShell`** — desktop app shell (app bar + drawer + content). Props include `navItems: AppShellNavItem[]`, sections. Types: `AppShellNavItem`, `AppShellNavSection`, `NavEntry`. Layout consts: `DRAWER_WIDTH`, `DRAWER_WIDTH_COLLAPSED`, `APPBAR_HEIGHT`.
- **`EmptyState`** — centered empty placeholder. `icon?`, `message`.
- **`ErrorBoundary`** — React error boundary with fallback.
- **`SuspenseLoader`** — Suspense wrapper with a centered spinner.
- **`Funnel`, `Step`** — multi-step funnel primitives (types `FunnelProps`, `StepProps`).
- **`OverlayProvider`, `OverlayContext`** — imperative overlay/modal mounting.
- **`BottomSheetCTA`** — bottom-sheet call-to-action pattern.
- **`ConfirmDialog`** — promise-based confirm dialog.
- **`Sortable`** (+ `arrayMove`, `useDroppable`, drag event types) — drag-and-drop list.
- **`HoBomSkeleton`** = `{ Card, List }` — skeleton presets.

## Charts

`import { createChart } from "hobom-design-system/charts"` (or the charts entry) —
d3-based chart factory with line/area/bar/donut/radar renderers, axes, legend,
hover overlay/tooltip. See `src/charts/`.

---

_Count check: Batch 1 (11) + Batch 2 passthrough (17, incl. ToggleButtonGroup) +
Batch 2 compound (9) + Batch 3 patterns (6) + Infra (3) = the full `Hb` object in
`src/components/index.ts`, plus the package-root patterns and charts above._
