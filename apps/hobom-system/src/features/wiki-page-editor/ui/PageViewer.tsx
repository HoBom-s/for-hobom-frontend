import { useMemo } from "react";
import { Hb } from "@/shared/ui";
import { sanitizeHtml } from "../lib/sanitize-html.lib";

interface PageViewerProps {
  content: string;
}

export const PageViewer = ({ content }: PageViewerProps) => {
  const sanitized = useMemo(() => sanitizeHtml(content), [content]);

  return (
    <Hb.Box
      dangerouslySetInnerHTML={{ __html: sanitized }}
      sx={{
        px: 3.5,
        py: 2,
        lineHeight: 1.7,
        fontSize: "0.9375rem",
        color: "text.primary",
        "& h1": { fontSize: "1.75rem", fontWeight: 700, mt: 3, mb: 1 },
        "& h2": {
          fontSize: "1.375rem",
          fontWeight: 600,
          mt: 2.5,
          mb: 0.75,
        },
        "& h3": { fontSize: "1.125rem", fontWeight: 600, mt: 2, mb: 0.5 },
        "& p": { mb: 1 },
        "& blockquote": {
          borderLeft: "3px solid",
          borderColor: "primary.main",
          pl: 2,
          ml: 0,
          color: "text.secondary",
          fontStyle: "italic",
        },
        "& pre": {
          bgcolor: "grey.50",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          overflow: "auto",
          "& code": {
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8125rem",
          },
        },
        "& code": {
          bgcolor: "grey.100",
          borderRadius: 0.5,
          px: 0.5,
          py: 0.25,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.8125rem",
        },
        "& a": {
          color: "primary.main",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        },
        "& ul, & ol": { pl: 3, mb: 1 },
        "& li": { mb: 0.25 },
        "& hr": {
          border: 0,
          borderTop: "1px solid",
          borderColor: "divider",
          my: 2,
        },
      }}
    />
  );
};
