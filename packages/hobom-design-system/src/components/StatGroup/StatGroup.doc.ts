import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "StatGroup",
  description:
    "A row (or grid) of headline stats — the recurring '240+ 누적 입양 · 32 보호 중 · 11년 운영' pattern for landing and About sections. Each item stacks a big value over a caption label.",
  features: [
    "Renders a semantic <dl>; each item is a value <dd> above a label <dt>",
    "Default flex wrap layout, or an equal-column grid via `columns`",
    "Fixed 24px gap so screens stop hand-rolling stat CSS",
    "Value uses the accent color and 700 weight; label is muted caption",
    "`variant=\"card\"` wraps each stat in a bordered surface — for the §04 shelter card layout",
  ],
  props: [
    {
      name: "StatGroup.Root columns",
      type: "number",
      description: "Lay out as this many equal columns; omit to wrap in a flex row.",
    },
    {
      name: "StatGroup.Root variant",
      type: `"plain" | "card"`,
      description: "`plain` (bare column) or `card` (each stat in a bordered surface). Defaults to `plain`.",
    },
    {
      name: "StatGroup.Item value",
      type: "ReactNode",
      description: "The prominent figure, e.g. `240+`.",
      required: true,
    },
    {
      name: "StatGroup.Item label",
      type: "ReactNode",
      description: "The line describing the figure, e.g. `누적 입양`.",
      required: true,
    },
  ],
  examples: [
    {
      label: "Inline stat row",
      code: `<Hb.StatGroup.Root>
  <Hb.StatGroup.Item value="240+" label="누적 입양" />
  <Hb.StatGroup.Item value="32" label="보호 중" />
  <Hb.StatGroup.Item value="11년" label="운영" />
</Hb.StatGroup.Root>`,
    },
    {
      label: "Three-column grid",
      code: `<Hb.StatGroup.Root columns={3}>
  <Hb.StatGroup.Item value="240+" label="누적 입양" />
  <Hb.StatGroup.Item value="32" label="보호 중" />
  <Hb.StatGroup.Item value="11년" label="운영" />
</Hb.StatGroup.Root>`,
    },
    {
      label: "Bordered stat cards",
      code: `<Hb.StatGroup.Root columns={3} variant="card">
  <Hb.StatGroup.Item value="240" label="누적 입양" />
  <Hb.StatGroup.Item value="32" label="보호 중" />
  <Hb.StatGroup.Item value="11년" label="운영" />
</Hb.StatGroup.Root>`,
    },
  ],
  accessibility: [
    "Renders a <dl> with each stat as a <dd> (value) and <dt> (label); the value comes first for visual emphasis.",
    "Give the <dl> an aria-label when the surrounding context does not already name the stats.",
  ],
  notes: [
    "Compose inside Hb.SectionCard for a titled stats block.",
    "value/label take ReactNode, so units or icons can be mixed into the figure.",
  ],
};
