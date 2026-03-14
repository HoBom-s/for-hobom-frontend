import { useState } from "react";
import { EditorContent } from "@tiptap/react";
import { Hb } from "@/shared/ui";
import { PageEditorToolbar } from "./PageEditorToolbar";
import type { Editor } from "@tiptap/react";

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
    <Hb.Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
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
            input: {
              sx: { fontSize: "1.5rem", fontWeight: 600 },
              disableUnderline: !titleError,
            },
          }}
          sx={{ flex: 1 }}
        />
        <Hb.Button variant="primary" onClick={handleSave} loading={saving} size="small">
          저장
        </Hb.Button>
      </Hb.Box>

      <PageEditorToolbar editor={editor} />

      <Hb.Box
        sx={(theme) => ({
          flex: 1,
          overflow: "auto",
          px: 3,
          py: 2,
          "& .tiptap": {
            outline: "none",
            minHeight: 300,
            "& > * + *": { mt: 0.5 },
            "& h1": { fontSize: "1.75rem", fontWeight: 700, mt: 3, mb: 1 },
            "& h2": {
              fontSize: "1.375rem",
              fontWeight: 600,
              mt: 2.5,
              mb: 0.75,
            },
            "& h3": { fontSize: "1.125rem", fontWeight: 600, mt: 2, mb: 0.5 },
            "& p": { lineHeight: 1.7 },
            "& blockquote": {
              borderLeft: "3px solid",
              borderColor: "primary.main",
              pl: 2,
              ml: 0,
              color: "text.secondary",
              fontStyle: "italic",
            },
            "& pre": {
              bgcolor: "grey.100",
              ...theme.applyStyles("dark", { bgcolor: "background.default" }),
              borderRadius: 1,
              p: 2,
              overflow: "auto",
              "& code": {
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.875rem",
              },
            },
            "& code": {
              bgcolor: "grey.100",
              ...theme.applyStyles("dark", { bgcolor: "background.default" }),
              borderRadius: 0.5,
              px: 0.5,
              py: 0.25,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.875rem",
            },
            "& a": {
              color: "primary.main",
              textDecoration: "underline",
              cursor: "pointer",
            },
            "& ul, & ol": { pl: 3 },
            "& hr": {
              border: 0,
              borderTop: "1px solid",
              borderColor: "divider",
              my: 2,
            },
            "& .is-empty::before": {
              content: "attr(data-placeholder)",
              color: "text.disabled",
              float: "left",
              height: 0,
              pointerEvents: "none",
            },
          },
        })}
      >
        <EditorContent editor={editor} />
      </Hb.Box>
    </Hb.Box>
  );
};
