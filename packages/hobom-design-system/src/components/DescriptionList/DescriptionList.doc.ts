import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "DescriptionList",
  description:
    "A term/description attribute grid: the aligned label-and-value list that detail screens hand-roll (an animal's traits, a shelter's facts). Renders a semantic <dl> with <dt>/<dd> pairs.",
  features: [
    "`grid` layout aligns terms and descriptions into two columns; `stacked` stacks each pair vertically",
    "Terms are Text body2 / secondary, descriptions Text body1 / primary — no hand-written typography",
    "Renders semantic <dl><dt><dd>; Root spreads the rest of the dl props",
    "Descriptions wrap and shrink safely (min-width: 0)",
  ],
  props: [
    {
      name: "layout",
      type: '"grid" | "stacked"',
      description: "Two aligned columns, or each term/description pair stacked vertically.",
      default: '"grid"',
    },
    { name: "children", type: "ReactNode", description: "DescriptionList.Item rows." },
  ],
  examples: [
    {
      label: "Grid of attributes",
      code: `<Hb.DescriptionList.Root>
  <Hb.DescriptionList.Item term="성별">수컷</Hb.DescriptionList.Item>
  <Hb.DescriptionList.Item term="나이">3살 추정</Hb.DescriptionList.Item>
  <Hb.DescriptionList.Item term="중성화">완료</Hb.DescriptionList.Item>
</Hb.DescriptionList.Root>`,
    },
    {
      label: "Stacked (long descriptions)",
      code: `<Hb.DescriptionList.Root layout="stacked">
  <Hb.DescriptionList.Item term="성격">사람을 잘 따르는 온순한 성격입니다.</Hb.DescriptionList.Item>
</Hb.DescriptionList.Root>`,
    },
  ],
  accessibility: [
    "Renders a semantic <dl> with <dt>/<dd> pairs — screen readers announce the term/description relationship.",
    "In grid layout each Item emits a <dt> and <dd> as direct grid cells; keep one description per term.",
  ],
  notes: [
    "Compose inside Hb.SectionCard for a titled attribute block.",
    "Prefer `stacked` when descriptions are long paragraphs rather than short values.",
  ],
};
