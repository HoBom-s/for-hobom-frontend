import { Suspense } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "hobom-design-system/icons";
import { PageViewer } from "@/features/wiki-page-editor";
import { CommentsSection } from "@/features/wiki-page-comments";
import { VersionHistoryDrawer } from "@/features/wiki-page-versions";
import { Hb } from "@/shared/ui";
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
    <Hb.Box sx={{ p: 2 }}>
      <Hb.Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Hb.Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            px: 3.5,
            pt: 3,
            pb: 1,
          }}
        >
          <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
            <Hb.Text
              variant="h4"
              sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.75 }}
            >
              {page.title}
            </Hb.Text>
            <Hb.Text variant="caption" color="text.disabled">
              마지막 수정{" "}
              {new Date(page.updatedAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Hb.Text>
          </Hb.Box>
          <Hb.Box sx={{ display: "flex", gap: 0.5, ml: 2, flexShrink: 0 }}>
            <Hb.Tooltip title="버전 히스토리">
              <Hb.Button.Icon
                size="small"
                onClick={() => setVersionDrawerOpen(true)}
                sx={{ color: "text.secondary" }}
              >
                <HistoryOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="편집">
              <Hb.Button.Icon
                size="small"
                onClick={() => setEditing(true)}
                sx={{ color: "text.secondary" }}
              >
                <EditOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="삭제">
              <Hb.Button.Icon
                size="small"
                onClick={() => setDeleteDialogOpen(true)}
                sx={{ color: "text.secondary" }}
              >
                <DeleteOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
          </Hb.Box>
        </Hb.Box>

        <Hb.Divider sx={{ mx: 3.5, my: 1.5 }} />

        <PageViewer content={page.content} />
      </Hb.Paper>

      <Hb.Paper
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
            <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <Hb.Progress.Circular size={20} />
            </Hb.Box>
          }
        >
          <CommentsSection
            spaceKey={spaceKey}
            pageId={pageId}
            userInfo={userInfo}
          />
        </Suspense>
      </Hb.Paper>

      <VersionHistoryDrawer
        open={versionDrawerOpen}
        onClose={() => setVersionDrawerOpen(false)}
        spaceKey={spaceKey}
        pageId={pageId}
      />
      <Hb.Dialog.Root
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <Hb.Dialog.Title>페이지 삭제</Hb.Dialog.Title>
        <Hb.Dialog.Content>
          <Hb.Dialog.ContentText>
            <strong>"{page.title}"</strong> 페이지를 삭제할까요?
            <br />이 작업은 되돌릴 수 없어요.
          </Hb.Dialog.ContentText>
        </Hb.Dialog.Content>
        <Hb.Dialog.Actions>
          <Hb.Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            취소
          </Hb.Button>
          <Hb.Button
            onClick={handleDelete}
            variant="danger"
            loading={isDeleting}
          >
            삭제
          </Hb.Button>
        </Hb.Dialog.Actions>
      </Hb.Dialog.Root>
    </Hb.Box>
  );
};
