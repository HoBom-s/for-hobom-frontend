import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "SectionCard",
  description:
    "A titled content block: a bordered surface with an optional header (title, description, right-aligned action) and a free-form body with consistent vertical rhythm.",
  features: [
    "Owns the frame, header row, and 16px body gap so screens stop hand-rolling section CSS",
    "`outlined` (bordered surface) or `plain` (heading + rhythm only) variants",
    "Header collapses entirely when no title/description/action is passed",
    "Renders a semantic <section>; spreads the rest of the div props",
  ],
  props: [
    { name: "title", type: "ReactNode", description: "Heading at the top of the section." },
    { name: "description", type: "ReactNode", description: "Supporting line under the title." },
    {
      name: "action",
      type: "ReactNode",
      description: "Right-aligned header slot, e.g. a link or ghost button.",
    },
    {
      name: "variant",
      type: '"outlined" | "plain"',
      description: "Bordered surface, or heading + rhythm with no frame.",
      default: '"outlined"',
    },
    { name: "children", type: "ReactNode", description: "Section body — compose freely." },
  ],
  examples: [
    {
      label: "Titled section with an action",
      code: `<Hb.SectionCard title="우리 아이들" description="입양을 기다리는 32마리" action={<Hb.Button size="small" variant="ghost">전체 보기</Hb.Button>}>
  <AnimalGrid animals={animals} />
</Hb.SectionCard>`,
    },
    {
      label: "Plain (no frame)",
      code: `<Hb.SectionCard variant="plain" title="방문 안내">
  <Hb.Text variant="body2" color="text.secondary">평일 10:00–18:00</Hb.Text>
</Hb.SectionCard>`,
    },
  ],
  accessibility: [
    "Renders a <section>; give it an aria-label or an id-linked heading when several sections share a page.",
    "The title is an <h6> (Text variant); keep the surrounding heading order sensible.",
  ],
  notes: [
    "Compose Hb.DescriptionList, Hb.StatGroup, or a grid inside — SectionCard only owns the frame.",
    "For a clickable surface use Hb.Card.Clickable instead.",
  ],
};
