import { Hb } from "@/shared/ui";
import type { StudioDocument } from "@/entities/document";
import { generateJsx } from "../lib/generate-jsx.lib";

interface CodePanelProps {
  document: StudioDocument;
}

/** Document Model에서 생성한 JSX 코드를 보여준다. 문서가 바뀌면 즉시 갱신. */
export function CodePanel({ document }: CodePanelProps) {
  const code = generateJsx(document);

  return (
    <Hb.Box
      component="pre"
      sx={{
        m: 0,
        p: 1.5,
        bgcolor: "background.default",
        borderRadius: 1,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "0.75rem",
        lineHeight: 1.6,
        overflow: "auto",
        whiteSpace: "pre",
      }}
    >
      {code}
    </Hb.Box>
  );
}
