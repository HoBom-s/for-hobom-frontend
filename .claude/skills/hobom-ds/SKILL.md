---
name: hobom-ds
description: Use when building or styling any UI in this monorepo, or when adding/extending a component in the hobom-design-system package. Covers the Hb component catalog, the "compose, don't hand-roll" rule, the folder/doc/story recipe for new components, CSS tokens, and verification commands. Invoke before writing bespoke StyleX in an app or reinventing a primitive.
---

# hobom-design-system (Hb)

`hobom-design-system` is a self-hosted, MUI-parity component kit built on **StyleX**.
Everything the app renders should come from it. Before writing a `*.styles.ts` in an
app, check the catalog — the primitive almost certainly exists.

```ts
import { Hb } from "hobom-design-system";
import { LocationOnOutlined } from "hobom-design-system/icons";

<Hb.Stack spacing={2}>
  <Hb.Text variant="h5">보호소</Hb.Text>
  <Hb.SectionCard title="소개">…</Hb.SectionCard>
</Hb.Stack>
```

## Golden rules

1. **Compose, don't hand-roll.** Layout, typography, and surfaces are DS primitives
   (`Hb.Stack`, `Hb.Grid`, `Hb.Box`, `Hb.Text`, `Hb.Card`, `Hb.SectionCard`,
   `Hb.PageHeader`, `Hb.Breadcrumb`, `Hb.DescriptionList`, `Hb.StatGroup`,
   `Hb.Gallery`). Reach for a bespoke `stylex.create` in an app only for a
   one-off that no primitive covers — and if it recurs, promote it to the DS.
2. **New shared UI goes in the DS, not the app.** If a screen needs a new visual
   pattern, add a variant/component here so every app gets it. Never reference an
   app token (`--hb-angel-*`) from inside the DS — DS uses only its own `--hb-*`
   tokens so it stays app-agnostic and theme-flippable.
3. **Compound (namespace) pattern** for anything with parts:
   `export const X = { Root, Item }` with a React context linking them
   (see `Tabs`, `DescriptionList`, `Breadcrumb`).
4. **Semantic colors, not hex.** Use `Hb.Text color="text.secondary"` and the
   `--hb-color-*` vars, never raw hex — they flip in dark mode automatically.

## Catalog

37+ components live under `Hb.*`. For the full list with props and one-line
usage, read **[references/component-index.md](references/component-index.md)** —
do that instead of reading each component's source. The composition patterns you
will reach for most when laying out a screen:

| Need | Use |
| --- | --- |
| Page/screen title block | `Hb.PageHeader` (title, description, actions, breadcrumb) |
| Trail above a title | `Hb.Breadcrumb.Root` / `.Item current` |
| Titled bordered section | `Hb.SectionCard` (title, description, action, `variant`) |
| Term/value attribute grid | `Hb.DescriptionList.Root` / `.Item term=` |
| Stat row (240+ 입양 · 32 보호중) | `Hb.StatGroup.Root` / `.Item value= label=` |
| Photo gallery (main + thumbs) | `Hb.Gallery images=` (composes `Hb.Image`) |
| Tabbed content | `Hb.Tabs.Provider` wrapping `.Root` + `.Item` + `.Panel value=` (Provider needed for panels) |
| Vertical/horizontal spacing | `Hb.Stack spacing=` (× 8px), `direction` |
| 12-col responsive layout | `Hb.Grid container spacing size={{ xs, md }}` |
| Empty/error placeholder | `EmptyState` (from `hobom-design-system`) |

## Adding or extending a component

A component is a folder under `packages/hobom-design-system/src/components/<Name>/`
with four files. Copy `SectionCard/` as the canonical template.

1. **`<Name>.tsx`** — `stylex.create` for styles; merge external `className`/`style`:
   ```ts
   className={[sx.className, className].filter(Boolean).join(" ") || undefined}
   style={{ ...sx.style, ...style }}
   ```
   Extend `HTMLAttributes<HTMLXElement>` and spread `...rest` onto the root.
   **`Omit<…, "title">`** if you add a `title` prop (it clashes with the DOM one).
   Compose `Text` for typography instead of raw font CSS.
2. **`index.ts`** — `export * from "./<Name>";`
3. **`<Name>.stories.tsx`** — `title: "Components/<Name>"`, `satisfies Meta<…>`.
   If the component has a **required** prop, put it in `meta.args` or the story
   won't typecheck. These stories are also the test suite (run in a browser with
   an a11y axe pass).
4. **`<Name>.doc.ts`** — `export const docs: ComponentDoc` (type in
   `foundations/docs.ts`): name, description, features, props, examples,
   accessibility, notes. This is the agent-facing source of truth — fill it so
   future work reads the doc, not the source.

Then register it in **`src/components/index.ts`**: add the import and the entry in
the `Hb` object (see the "Batch 3 — composition patterns" section).

### a11y note (color-contrast)
`text.secondary` (#737373) on the canvas (#f1f1f1) at 13px is ~4.19:1 — just
under WCAG AA 4.5:1. It's a DS-wide token tradeoff already shipped app-wide. When
a story renders small secondary text on the canvas, disable just that rule (other
checks still run), mirroring `Card.stories`/`SectionCard.stories`:
```ts
parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
```

## CSS tokens (DS-internal `--hb-*`)

Colors: `--hb-color-surface` (card/white), `--hb-color-canvas` (page bg),
`--hb-color-border`, `--hb-color-text-primary` / `-secondary` / `-disabled`,
`--hb-color-accent` / `-accent-dark` / `-accent-contrast`, `--hb-color-danger`,
`--hb-color-success` / `-success-subtle`, `--hb-color-warning` / `-warning-subtle`.
Radius is literal in components (8 for controls, 12 for section surfaces).
Spacing scale is 8px units (`Hb.Stack spacing={2}` = 16px).

## Verify (always run before committing DS changes)

```bash
pnpm --filter hobom-design-system typecheck
pnpm --filter hobom-design-system lint
pnpm --filter hobom-design-system test -- --run
```

Lint gotchas: import order (react → external → internal relative), blank line
before a `return`/`export` that follows a statement, `interface` over `type` for
object shapes, no unused vars, `noUncheckedIndexedAccess` (guard `arr[0]`).
