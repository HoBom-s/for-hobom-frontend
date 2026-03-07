import { Suspense } from "react";
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
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { PageViewer } from "@/features/wiki-page-editor";
import { CommentsSection } from "@/features/wiki-page-comments";
import { VersionHistoryDrawer } from "@/features/wiki-page-versions";
import { usePageContent } from "../model/usePageContent";
import { PageEditor } from "./PageEditor";

export const PageContent = ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => {
  const {
    editing,
    setEditing,
    versionDrawerOpen,
    setVersionDrawerOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    page,
    userInfo,
    handleDelete,
    isDeleting,
  } = usePageContent({ spaceKey, pageId });

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
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
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

        <PageViewer content={page.content} />
      </Paper>

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
          <CommentsSection
            spaceKey={spaceKey}
            pageId={pageId}
            userInfo={userInfo}
          />
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
            disabled={isDeleting}
          >
            취소
          </Button>
          <LoadingButton
            onClick={handleDelete}
            color="error"
            variant="contained"
            loading={isDeleting}
          >
            삭제
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
