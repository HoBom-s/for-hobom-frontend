import { useMemo } from "react";
import { useSuspenseQuery } from "hobom-data";
import { wikiPageQueries } from "@/entities/wiki-page";
import { sanitizeHtml } from "@/shared/lib/sanitize-html.lib";
import { Hb } from "@/shared/ui";

// StyleX is atomic and cannot express descendant selectors, so the prose
// styling is rendered as a scoped <style> tag instead.
const PROSE_CLASS = "wiki-version-preview-prose";
const PROSE_CSS = `
.${PROSE_CLASS} {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--hb-color-text-primary);
  padding: 16px;
  background-color: var(--hb-color-canvas);
  border: 1px solid var(--hb-color-border);
  border-radius: 8px;
}
.${PROSE_CLASS} h1, .${PROSE_CLASS} h2, .${PROSE_CLASS} h3 { margin-top: 12px; margin-bottom: 4px; }
.${PROSE_CLASS} p { margin-bottom: 4px; }
.${PROSE_CLASS} a { color: var(--hb-color-accent); }
.${PROSE_CLASS} pre {
  background-color: var(--hb-color-canvas);
  border: 1px solid var(--hb-color-border);
  padding: 8px;
  border-radius: 8px;
  overflow: auto;
}
.${PROSE_CLASS} code {
  background-color: var(--hb-color-canvas);
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 4px;
  font-size: 0.75rem;
}
`;

interface VersionPreviewProps {
  spaceKey: string;
  pageId: string;
  versionNumber: number;
}

export const VersionPreview = ({ spaceKey, pageId, versionNumber }: VersionPreviewProps) => {
  const { data } = useSuspenseQuery(wikiPageQueries.version(spaceKey, pageId, versionNumber));
  const version = data.items;
  const sanitizedContent = useMemo(() => sanitizeHtml(version.content), [version.content]);

  return (
    <Hb.Box
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Hb.Chip
          label={`v${version.version}`}
          size="small"
          color="primary"
          style={{
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
        <Hb.Text variant="subtitle2" fontWeight={600} noWrap>
          {version.title}
        </Hb.Text>
      </Hb.Box>
      <style dangerouslySetInnerHTML={{ __html: PROSE_CSS }} />
      <Hb.Box className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </Hb.Box>
  );
};
