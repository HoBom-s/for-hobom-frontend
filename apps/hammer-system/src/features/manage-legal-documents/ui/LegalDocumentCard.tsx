import { useState } from "react";
import { ExpandMore, ExpandLess } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import type { LegalDocumentResponse } from "@/entities/legal-document";

interface LegalDocumentCardProps {
  title: string;
  document: LegalDocumentResponse | null;
}

export const LegalDocumentCard = ({ title, document }: LegalDocumentCardProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!document) {
    return (
      <Hb.Card.Root>
        <Hb.Card.Content>
          <Hb.Text variant="h6" sx={{ mb: 1 }}>
            {title}
          </Hb.Text>
          <Hb.Text variant="body2" sx={{ color: "text.secondary" }}>
            등록된 문서가 없어요.
          </Hb.Text>
        </Hb.Card.Content>
      </Hb.Card.Root>
    );
  }

  return (
    <Hb.Card.Root>
      <Hb.Card.Content>
        <Hb.Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Hb.Text variant="h6">{title}</Hb.Text>
          <Hb.Stack direction="row" spacing={1} alignItems="center">
            <Hb.Chip label={`v${document.version}`} size="small" color="primary" />
            <Hb.Chip label={document.effectiveDate} size="small" variant="outlined" />
            <Hb.Button.Icon size="small" onClick={() => setExpanded((prev) => !prev)}>
              {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </Hb.Button.Icon>
          </Hb.Stack>
        </Hb.Box>
        <Hb.Box
          sx={{
            maxHeight: expanded ? "none" : 200,
            overflow: "auto",
            p: 2,
            bgcolor: "action.hover",
            borderRadius: 1,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: 13,
            transition: "max-height 0.2s ease",
          }}
        >
          {document.content}
        </Hb.Box>
      </Hb.Card.Content>
    </Hb.Card.Root>
  );
};
