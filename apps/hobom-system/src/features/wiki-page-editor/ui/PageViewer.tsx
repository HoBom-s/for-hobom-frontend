import { useMemo } from "react";
import { Hb } from "@/shared/ui";
import { sanitizeHtml } from "../lib/sanitize-html.lib";

// StyleX is atomic and cannot express descendant selectors, so the prose
// styling is rendered as a scoped <style> tag instead.
const PROSE_CLASS = "wiki-page-viewer-prose";
const PROSE_CSS = `
.${PROSE_CLASS} {
  padding-left: 28px;
  padding-right: 28px;
  padding-top: 16px;
  padding-bottom: 16px;
  line-height: 1.7;
  font-size: 0.9375rem;
  color: var(--hb-color-text-primary);
}
.${PROSE_CLASS} h1 { font-size: 1.75rem; font-weight: 700; margin-top: 24px; margin-bottom: 8px; }
.${PROSE_CLASS} h2 { font-size: 1.375rem; font-weight: 600; margin-top: 20px; margin-bottom: 6px; }
.${PROSE_CLASS} h3 { font-size: 1.125rem; font-weight: 600; margin-top: 16px; margin-bottom: 4px; }
.${PROSE_CLASS} p { margin-bottom: 8px; }
.${PROSE_CLASS} blockquote {
  border-left: 3px solid var(--hb-color-accent);
  padding-left: 16px;
  margin-left: 0;
  color: var(--hb-color-text-secondary);
  font-style: italic;
}
.${PROSE_CLASS} pre {
  background-color: var(--hb-color-canvas);
  border: 1px solid var(--hb-color-border);
  border-radius: 8px;
  padding: 16px;
  overflow: auto;
}
.${PROSE_CLASS} pre code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
}
.${PROSE_CLASS} code {
  background-color: var(--hb-color-canvas);
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
}
.${PROSE_CLASS} a {
  color: var(--hb-color-accent);
  text-decoration: none;
}
.${PROSE_CLASS} a:hover { text-decoration: underline; }
.${PROSE_CLASS} ul, .${PROSE_CLASS} ol { padding-left: 24px; margin-bottom: 8px; }
.${PROSE_CLASS} li { margin-bottom: 2px; }
.${PROSE_CLASS} hr {
  border: 0;
  border-top: 1px solid var(--hb-color-border);
  margin-top: 16px;
  margin-bottom: 16px;
}
`;

interface PageViewerProps {
  content: string;
}

export const PageViewer = ({ content }: PageViewerProps) => {
  const sanitized = useMemo(() => sanitizeHtml(content), [content]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PROSE_CSS }} />
      <Hb.Box className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: sanitized }} />
    </>
  );
};
