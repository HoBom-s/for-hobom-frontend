import { Suspense, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  wikiPageQueries,
  useUpdatePage,
  useDeletePage,
  UpdatePageSchema,
} from "@/entities/wiki-page";
import { validateWithZod } from "@/shared/lib";
import { useToast } from "@/shared/model";
import {
  usePageEditor,
  PageEditorContent,
  PageViewer,
} from "@/features/wiki-page-editor";
import { CommentsSection } from "@/features/wiki-page-comments";
import { VersionHistoryDrawer } from "@/features/wiki-page-versions";

interface WikiSpaceContext {
  spaceKey: string;
}

const validatePageUpdate = validateWithZod(UpdatePageSchema);

const PageEditor = ({
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

const PageContent = ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(wikiPageQueries.detail(spaceKey, pageId));
  const page = data.items;
  const deletePage = useDeletePage();

  const handleDelete = () => {
    deletePage.mutate(
      { spaceKey, pageId },
      {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          navigate(`/wiki/${spaceKey}`);
        },
      },
    );
  };

  if (editing) {
    return (
      <PageEditor
        spaceKey={spaceKey}
        pageId={pageId}
        initialTitle={page.title}
        initialContent={page.content}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* 페이지 본문 */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* 헤더: 제목 + 메타 + 액션 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            px: 3.5,
            pt: 3,
            pb: 1,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.75 }}
            >
              {page.title}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              마지막 수정{" "}
              {new Date(page.updatedAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, ml: 2, flexShrink: 0 }}>
            <Tooltip title="버전 히스토리">
              <IconButton
                size="small"
                onClick={() => setVersionDrawerOpen(true)}
                sx={{ color: "text.secondary" }}
              >
                <HistoryOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="편집">
              <IconButton
                size="small"
                onClick={() => setEditing(true)}
                sx={{ color: "text.secondary" }}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제">
              <IconButton
                size="small"
                onClick={() => setDeleteDialogOpen(true)}
                sx={{ color: "text.secondary" }}
              >
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Divider sx={{ mx: 3.5, my: 1.5 }} />

        {/* 본문 콘텐츠 */}
        <PageViewer content={page.content} />
      </Paper>

      {/* 댓글 */}
      <Paper
        elevation={0}
        sx={{
          mt: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={20} />
            </Box>
          }
        >
          <CommentsSection spaceKey={spaceKey} pageId={pageId} />
        </Suspense>
      </Paper>

      <VersionHistoryDrawer
        open={versionDrawerOpen}
        onClose={() => setVersionDrawerOpen(false)}
        spaceKey={spaceKey}
        pageId={pageId}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>페이지 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>"{page.title}"</strong> 페이지를 삭제할까요?
            <br />이 작업은 되돌릴 수 없어요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deletePage.isPending}
          >
            취소
          </Button>
          <LoadingButton
            onClick={handleDelete}
            color="error"
            variant="contained"
            loading={deletePage.isPending}
          >
            삭제
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ── 페이지 엔트리포인트 ──

const WikiPageViewPage = () => {
  const { spaceKey, pageId } = useParams<{
    spaceKey: string;
    pageId: string;
  }>();
  const context = useOutletContext<WikiSpaceContext>();
  const resolvedSpaceKey = spaceKey ?? context.spaceKey;

  if (!resolvedSpaceKey || !pageId) return null;

  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <PageContent spaceKey={resolvedSpaceKey} pageId={pageId} />
    </Suspense>
  );
};

export default WikiPageViewPage;
