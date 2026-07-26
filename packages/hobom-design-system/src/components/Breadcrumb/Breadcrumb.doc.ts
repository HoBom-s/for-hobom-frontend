import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "Breadcrumb",
  description:
    "A navigation trail of the current location within a hierarchy. Renders a semantic <nav><ol> and interleaves a separator between items; the consumer supplies the links.",
  features: [
    "Renders <nav aria-label> wrapping an <ol> — accessible landmark and list semantics for free",
    "Inserts the separator between items only (never trailing), each in an aria-hidden <li>",
    "Custom `separator` node (string, glyph, or icon); defaults to \"/\"",
    "`current` item gets aria-current=\"page\" and primary weight-600 styling; others stay secondary",
    "Item children color: inherit — pass a <Link>/<a> or plain text and it picks up the trail color",
  ],
  props: [
    {
      name: "Root.separator",
      type: "ReactNode",
      description: "Node rendered between items.",
      default: '"/"',
    },
    {
      name: "Root.aria-label",
      type: "string",
      description: "Landmark label for the <nav>.",
      default: '"위치"',
    },
    { name: "Root.children", type: "ReactNode", description: "Breadcrumb.Item elements." },
    {
      name: "Item.current",
      type: "boolean",
      description: "Marks the current location — sets aria-current=\"page\" and primary styling.",
      default: "false",
    },
    {
      name: "Item.children",
      type: "ReactNode",
      description: "A link or plain text for this crumb.",
    },
  ],
  examples: [
    {
      label: "Basic trail with router links",
      code: `<Hb.Breadcrumb.Root>
  <Hb.Breadcrumb.Item>
    <Link to="/">홈</Link>
  </Hb.Breadcrumb.Item>
  <Hb.Breadcrumb.Item>
    <Link to="/shelter">보호소</Link>
  </Hb.Breadcrumb.Item>
  <Hb.Breadcrumb.Item current>우리 아이들</Hb.Breadcrumb.Item>
</Hb.Breadcrumb.Root>`,
    },
    {
      label: "Custom separator",
      code: `<Hb.Breadcrumb.Root separator="›">
  <Hb.Breadcrumb.Item>
    <Link to="/adopt">입양</Link>
  </Hb.Breadcrumb.Item>
  <Hb.Breadcrumb.Item current>신청 내역</Hb.Breadcrumb.Item>
</Hb.Breadcrumb.Root>`,
    },
  ],
  accessibility: [
    "Root renders <nav aria-label=\"위치\"> — a labelled navigation landmark; override aria-label per app locale/context.",
    "The trail is an <ol> of <li>; separators are aria-hidden so screen readers skip them.",
    "The `current` item carries aria-current=\"page\" and is non-interactive (render it as plain text, not a link).",
  ],
  notes: [
    "Breadcrumb.Item only wraps and styles — put a react-router <Link> or an <a> inside for navigation.",
    "Item children use color: inherit; a link renders in the trail color unless the consumer overrides it.",
  ],
};
