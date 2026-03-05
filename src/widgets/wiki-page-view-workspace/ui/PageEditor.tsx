import { useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { useUpdatePage, UpdatePageSchema } from "@/entities/wiki-page";
import { validateWithZod } from "@/shared/lib";
import { useToast } from "@/shared/model";
import { usePageEditor, PageEditorContent } from "@/features/wiki-page-editor";

const validatePageUpdate = validateWithZod(UpdatePageSchema);

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
    <Paper
      elevation={0}
      sx={{
        m: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 280px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: 2,
          py: 1,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Button
          size="small"
          variant="text"
          startIcon={<VisibilityOutlined />}
          onClick={onCancel}
          sx={{ textTransform: "none", color: "text.secondary" }}
        >
          보기 모드
        </Button>
      </Box>
      <PageEditorContent
        editor={editor}
        title={title}
        onTitleChange={setTitle}
        onSave={handleSave}
        saving={updatePage.isPending}
      />
    </Paper>
  );
};
