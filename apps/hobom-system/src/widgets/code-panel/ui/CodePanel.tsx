import { Check, ContentCopyOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import type { StudioDocument } from "@/entities/document";
import { generateJsx } from "../lib/generate-jsx.lib";
import { useCopyToClipboard } from "../model/useCopyToClipboard";

interface CodePanelProps {
  document: StudioDocument;
}

/** Document Model에서 생성한 JSX 코드를 보여주고 복사할 수 있게 한다. */
export function CodePanel({ document }: CodePanelProps) {
  const code = generateJsx(document);
  const { copied, copy } = useCopyToClipboard();

  return (
    <Hb.Stack
      style={{
        minWidth: 0,
        gap: 8,
      }}
    >
      <Hb.Stack
        direction="row"
        style={{
          alignItems: "center",
          gap: 4,
        }}
      >
        <Hb.Text
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            color: "var(--hb-color-text-secondary)",
          }}
        >
          코드
        </Hb.Text>
        <Hb.Button.Icon
          size="small"
          aria-label="코드 복사"
          onClick={() => copy(code)}
          sx={{ p: 0.25, color: copied ? "primary.main" : "text.secondary" }}
        >
          {copied ? <Check sx={{ fontSize: 16 }} /> : <ContentCopyOutlined sx={{ fontSize: 16 }} />}
        </Hb.Button.Icon>
      </Hb.Stack>
      <Hb.Box
        component="pre"
        style={{
          margin: 0,
          padding: 12,
          minWidth: 0,
          maxWidth: "100%",
          backgroundColor: "var(--hb-color-canvas)",
          borderRadius: 8,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "0.75rem",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
        }}
      >
        {code}
      </Hb.Box>
    </Hb.Stack>
  );
}
