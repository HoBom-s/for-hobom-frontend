import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "PageHeader",
  description:
    "The standard page/screen title block: an optional breadcrumb on top, then a row with the title and supporting description on the left and actions on the right, with room for extra content (filter chips, tabs) below.",
  features: [
    "Owns the breadcrumb slot, title row, and 12px vertical rhythm so screens stop hand-rolling header CSS",
    "Title (h5) and description (body2, secondary) compose Text — no hand-written font CSS",
    "Right-aligned actions slot collapses when no actions are passed",
    "Renders a semantic <header>; spreads the rest of the div props",
  ],
  props: [
    { name: "title", type: "ReactNode", description: "Page/screen title.", required: true },
    {
      name: "description",
      type: "ReactNode",
      description: "Supporting line under the title.",
    },
    {
      name: "actions",
      type: "ReactNode",
      description: "Right-aligned slot in the title row, e.g. buttons.",
    },
    {
      name: "breadcrumb",
      type: "ReactNode",
      description: "Rendered above the title row, e.g. an Hb.Breadcrumb.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Extra content below the title row, e.g. filter chips or tabs.",
    },
  ],
  examples: [
    {
      label: "Title with a description and actions",
      code: `<Hb.PageHeader title="입양 관리" description="입양을 기다리는 32마리의 아이들" actions={<Hb.Button size="small" variant="primary">새 공고 등록</Hb.Button>} />`,
    },
    {
      label: "With a breadcrumb slot",
      code: `<Hb.PageHeader
  breadcrumb={<Hb.Breadcrumb.Root><Hb.Breadcrumb.Item href="/">홈</Hb.Breadcrumb.Item><Hb.Breadcrumb.Item>입양</Hb.Breadcrumb.Item></Hb.Breadcrumb.Root>}
  title="입양 관리"
  description="입양을 기다리는 32마리의 아이들"
/>`,
    },
  ],
  accessibility: [
    "Renders a <header>; the title is an <h5> (Text variant), so keep the surrounding heading order sensible.",
    "When passing a breadcrumb, use a <nav aria-label> around the trail (Hb.Breadcrumb handles this).",
  ],
  notes: [
    "Compose filter chips, tabs, or a StatGroup via children — PageHeader only owns the header block.",
    "For an in-card section heading use Hb.SectionCard instead.",
  ],
};
