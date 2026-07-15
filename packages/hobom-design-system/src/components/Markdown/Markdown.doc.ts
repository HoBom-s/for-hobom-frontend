import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "Markdown",
  description:
    "The single audited boundary for rendering untrusted, user-authored Markdown (shelter intros, visit/support guides). Renders GitHub-flavored Markdown safely: raw HTML is never executed, the output is sanitized, and link protocols are restricted. Treat the input as a stored-XSS risk.",
  features: [
    "GitHub-flavored Markdown (tables, autolinks, strikethrough, task lists) via remark-gfm",
    "Sanitizes output with rehype-sanitize — strips <script>, event handlers, and raw HTML",
    "Restricts anchor href protocols to http/https/mailto, dropping javascript:/data: URLs",
    "Never enables rehype-raw or dangerouslySetInnerHTML",
    "Maps prose nodes (headings, paragraphs, lists, links, code) to DS typography",
    "External links open in a new tab with rel=\"noopener noreferrer\"",
    "Renders nothing when the source is empty or whitespace",
  ],
  props: [
    {
      name: "children",
      type: "string",
      description: "The Markdown source string. Rendered safely — no raw HTML is executed.",
      required: true,
    },
    { name: "className", type: "string", description: "Merged onto the container div." },
    { name: "style", type: "CSSProperties", description: "Merged onto the container div." },
  ],
  examples: [
    {
      label: "Render a shelter intro",
      code: `<Hb.Markdown>{shelter.intro}</Hb.Markdown>`,
    },
    {
      label: "A guide with a width cap",
      code: `<div style={{ maxWidth: 640 }}>
  <Hb.Markdown>{shelter.visitGuide}</Hb.Markdown>
</div>`,
    },
  ],
  accessibility: [
    "Headings map to Text with modest sizes (h1 → h5, h2..h6 → h6); keep the surrounding heading order sensible.",
    "External links carry rel=\"noopener noreferrer\" and target=\"_blank\".",
  ],
  notes: [
    "This is the single audited boundary for untrusted Markdown — use it for ANY user-authored content instead of rendering Markdown yourself, so the sanitize policy stays centralized.",
    "The sanitize schema is derived from rehype-sanitize's defaultSchema with href protocols narrowed to http/https/mailto.",
    "Unmapped Markdown nodes fall back to react-markdown defaults, which are still passed through the sanitizer.",
  ],
};
