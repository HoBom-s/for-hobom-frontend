import { useState } from "react";
import { VisibilityOutlined } from "hobom-design-system/icons";
import { useUpdatePage, UpdatePageSchema } from "@/entities/wiki-page";
import { validateWithSchema } from "@/shared/lib";
import { useToast } from "@/shared/model";
import { usePageEditor, PageEditorContent } from "@/features/wiki-page-editor";
import { Hb } from "@/shared/ui";

const validatePageUpdate = validateWithSchema(UpdatePageSchema);

export const PageEditor = ({
  spaceKey,
  pageId,
  initialTitle,
  initialContent,
  onCancel,
}: {
  spaceKey: string;
  pageId: string;
  initialTitle: string;
  initialContent: string;
  onCancel: () => void;
}) => {
  const [title, setTitle] = useState(initialTitle);
  const updatePage = useUpdatePage();
  const { openErrorToast } = useToast();

  const { editor, getHtml } = usePageEditor({
    initialContent,
    editable: true,
  });

  const handleSave = () => {
    const result = validatePageUpdate({ title, content: getHtml() });

    if (result instanceof Error) {
      openErrorToast({ message: result.message });

      return;
    }
    updatePage.mutate(
      { spaceKey, pageId, title: result.title, content: result.content },
      { onSuccess: onCancel },
    );
  };

  return (
    <Hb.Paper
      elevation={0}
      style={{
        margin: 16,
        border: "1px solid",
        borderColor: "var(--hb-color-border)",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 280px)",
      }}
    >
      <Hb.Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: 2,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
          ...theme.applyStyles("dark", { bgcolor: "background.default" }),
        })}
      >
        <Hb.Button
          size="small"
          variant="ghost"
          startIcon={<VisibilityOutlined />}
          onClick={onCancel}
          sx={{ textTransform: "none", color: "text.secondary" }}
        >
          보기 모드
        </Hb.Button>
      </Hb.Box>
      <PageEditorContent
        editor={editor}
        title={title}
        onTitleChange={setTitle}
        onSave={handleSave}
        saving={updatePage.isPending}
      />
    </Hb.Paper>
  );
};
