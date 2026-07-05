import { useMemo } from "react";
import { useSuspenseQuery } from "hobom-data";
import { wikiPageQueries } from "@/entities/wiki-page";
import { sanitizeHtml } from "@/shared/lib/sanitize-html.lib";
import { Hb } from "@/shared/ui";

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
    <Hb.Box sx={{ px: 2.5, py: 2 }}>
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
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
      <Hb.Box
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        sx={(theme) => ({
          fontSize: "0.8125rem",
          lineHeight: 1.6,
          color: "text.primary",
          p: 2,
          bgcolor: "grey.50",
          ...theme.applyStyles("dark", { bgcolor: "background.default" }),
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          "& h1, & h2, & h3": { mt: 1.5, mb: 0.5 },
          "& p": { mb: 0.5 },
          "& a": { color: "primary.main" },
          "& pre": {
            bgcolor: "grey.100",
            ...theme.applyStyles("dark", { bgcolor: "background.default" }),
            border: "1px solid",
            borderColor: "divider",
            p: 1,
            borderRadius: 1,
            overflow: "auto",
          },
          "& code": {
            bgcolor: "grey.100",
            ...theme.applyStyles("dark", { bgcolor: "background.default" }),
            px: 0.5,
            borderRadius: 0.5,
            fontSize: "0.75rem",
          },
        })}
      />
    </Hb.Box>
  );
};
