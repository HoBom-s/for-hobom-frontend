import { useState } from "react";
import { EditorContent } from "@tiptap/react";
import { Hb } from "@/shared/ui";
import { PageEditorToolbar } from "./PageEditorToolbar";
import type { Editor } from "@tiptap/react";

// StyleX is atomic and cannot express descendant selectors, so the prose /
// tiptap styling is rendered as a scoped <style> tag instead.
const PROSE_CLASS = "wiki-page-editor-prose";
const PROSE_CSS = `
.${PROSE_CLASS} {
  flex: 1;
  overflow: auto;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 16px;
  padding-bottom: 16px;
}
.${PROSE_CLASS} .tiptap {
  outline: none;
  min-height: 300px;
}
.${PROSE_CLASS} .tiptap > * + * { margin-top: 4px; }
.${PROSE_CLASS} .tiptap h1 { font-size: 1.75rem; font-weight: 700; margin-top: 24px; margin-bottom: 8px; }
.${PROSE_CLASS} .tiptap h2 { font-size: 1.375rem; font-weight: 600; margin-top: 20px; margin-bottom: 6px; }
.${PROSE_CLASS} .tiptap h3 { font-size: 1.125rem; font-weight: 600; margin-top: 16px; margin-bottom: 4px; }
.${PROSE_CLASS} .tiptap p { line-height: 1.7; }
.${PROSE_CLASS} .tiptap blockquote {
  border-left: 3px solid var(--hb-color-accent);
  padding-left: 16px;
  margin-left: 0;
  color: var(--hb-color-text-secondary);
  font-style: italic;
}
.${PROSE_CLASS} .tiptap pre {
  background-color: var(--hb-color-canvas);
  border-radius: 8px;
  padding: 16px;
  overflow: auto;
}
.${PROSE_CLASS} .tiptap pre code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
}
.${PROSE_CLASS} .tiptap code {
  background-color: var(--hb-color-canvas);
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
}
.${PROSE_CLASS} .tiptap a {
  color: var(--hb-color-accent);
  text-decoration: underline;
  cursor: pointer;
}
.${PROSE_CLASS} .tiptap ul, .${PROSE_CLASS} .tiptap ol { padding-left: 24px; }
.${PROSE_CLASS} .tiptap hr {
  border: 0;
  border-top: 1px solid var(--hb-color-border);
  margin-top: 16px;
  margin-bottom: 16px;
}
.${PROSE_CLASS} .tiptap .is-empty::before {
  content: attr(data-placeholder);
  color: var(--hb-color-text-disabled);
  float: left;
  height: 0;
  pointer-events: none;
}
`;

interface PageEditorContentProps {
  editor: Editor | null;
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  saving?: boolean;
}

export const PageEditorContent = ({
  editor,
  title,
  onTitleChange,
  onSave,
  saving = false,
}: PageEditorContentProps) => {
  const [titleError, setTitleError] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      setTitleError(true);

      return;
    }
    setTitleError(false);
    onSave();
  };

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottom: "1px solid",
          borderColor: "var(--hb-color-border)",
        }}
      >
        <Hb.TextField
          value={title}
          onChange={(e) => {
            onTitleChange(e.target.value);
            if (e.target.value.trim()) setTitleError(false);
          }}
          placeholder="페이지 제목"
          error={titleError}
          helperText={titleError ? "제목을 입력하세요" : undefined}
          slotProps={{
            htmlInput: { style: { fontSize: "1.5rem", fontWeight: 600 } },
          }}
          style={{
            flex: 1
          }}
        />
        <Hb.Button variant="primary" onClick={handleSave} loading={saving} size="small">
          저장
        </Hb.Button>
      </Hb.Box>
      <PageEditorToolbar editor={editor} />
      <style dangerouslySetInnerHTML={{ __html: PROSE_CSS }} />
      <Hb.Box className={PROSE_CLASS}>
        <EditorContent editor={editor} />
      </Hb.Box>
    </Hb.Box>
  );
};
