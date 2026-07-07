import { Suspense } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  DriveFileMoveOutlined,
  ContentCopyOutlined,
} from "hobom-design-system/icons";
import { PageViewer } from "@/features/wiki-page-editor";
import { CommentsSection } from "@/features/wiki-page-comments";
import { VersionHistoryDrawer } from "@/features/wiki-page-versions";
import { MovePageDialog, CopyPageDialog } from "@/features/wiki-page-tree";
import { PageLabelChips } from "@/features/wiki-label-manager";
import { Hb, ErrorBoundary } from "@/shared/ui";
import { usePageContent } from "../model/usePageContent";
import { PageEditor } from "./PageEditor";

export const PageContent = ({ spaceKey, pageId }: { spaceKey: string; pageId: string }) => {
  const {
    editing,
    setEditing,
    versionDrawerOpen,
    setVersionDrawerOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    moveDialogOpen,
    setMoveDialogOpen,
    copyDialogOpen,
    setCopyDialogOpen,
    page,
    userInfo,
    handleDelete,
    handleMove,
    handleCopy,
    isDeleting,
    isMoving,
    isCopying,
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
    <Hb.Box
      style={{
        padding: 16,
      }}
    >
      <Hb.Paper
        elevation={0}
        style={{
          border: "1px solid",
          borderColor: "var(--hb-color-border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingLeft: 28,
            paddingRight: 28,
            paddingTop: 24,
            paddingBottom: 8,
          }}
        >
          <Hb.Box
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Hb.Text
              variant="h4"
              style={{
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 6,
              }}
            >
              {page.title}
            </Hb.Text>
            <Hb.Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Hb.Text
                variant="caption"
                color="text.disabled"
                style={{
                  flexShrink: 0,
                }}
              >
                마지막 수정{" "}
                {new Date(page.updatedAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Hb.Text>
              <ErrorBoundary inline>
                <Suspense fallback={null}>
                  <PageLabelChips
                    spaceKey={spaceKey}
                    pageId={pageId}
                    pageLabels={page.labels ?? []}
                  />
                </Suspense>
              </ErrorBoundary>
            </Hb.Box>
          </Hb.Box>
          <Hb.Box
            style={{
              display: "flex",
              gap: 4,
              marginLeft: 16,
              flexShrink: 0,
            }}
          >
            <Hb.Tooltip title="버전 히스토리">
              <Hb.Button.Icon
                size="small"
                aria-label="버전 히스토리"
                onClick={() => setVersionDrawerOpen(true)}
                style={{
                  color: "var(--hb-color-text-secondary)",
                }}
              >
                <HistoryOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="편집">
              <Hb.Button.Icon
                size="small"
                aria-label="편집"
                onClick={() => setEditing(true)}
                style={{
                  color: "var(--hb-color-text-secondary)",
                }}
              >
                <EditOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="이동">
              <Hb.Button.Icon
                size="small"
                aria-label="페이지 이동"
                onClick={() => setMoveDialogOpen(true)}
                style={{
                  color: "var(--hb-color-text-secondary)",
                }}
              >
                <DriveFileMoveOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="복사">
              <Hb.Button.Icon
                size="small"
                aria-label="페이지 복사"
                onClick={() => setCopyDialogOpen(true)}
                style={{
                  color: "var(--hb-color-text-secondary)",
                }}
              >
                <ContentCopyOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="삭제">
              <Hb.Button.Icon
                size="small"
                aria-label="페이지 삭제"
                onClick={() => setDeleteDialogOpen(true)}
                style={{
                  color: "var(--hb-color-text-secondary)",
                }}
              >
                <DeleteOutlined fontSize="small" />
              </Hb.Button.Icon>
            </Hb.Tooltip>
          </Hb.Box>
        </Hb.Box>

        <Hb.Divider
          style={{
            marginLeft: 28,
            marginRight: 28,
            marginTop: 12,
            marginBottom: 12,
          }}
        />

        <PageViewer content={page.content} />
      </Hb.Paper>
      <Hb.Paper
        elevation={0}
        style={{
          marginTop: 16,
          border: "1px solid",
          borderColor: "var(--hb-color-border)",
          borderRadius: 16,
        }}
      >
        <Suspense
          fallback={
            <Hb.Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 32,
                paddingBottom: 32,
              }}
            >
              <Hb.Progress.Circular size={20} />
            </Hb.Box>
          }
        >
          <CommentsSection spaceKey={spaceKey} pageId={pageId} userInfo={userInfo} />
        </Suspense>
      </Hb.Paper>
      <VersionHistoryDrawer
        open={versionDrawerOpen}
        onClose={() => setVersionDrawerOpen(false)}
        spaceKey={spaceKey}
        pageId={pageId}
      />
      <Hb.Dialog.Root open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <Hb.Dialog.Title>페이지 삭제</Hb.Dialog.Title>
        <Hb.Dialog.Content>
          <Hb.Dialog.ContentText>
            <strong>"{page.title}"</strong> 페이지를 삭제할까요?
            <br />이 작업은 되돌릴 수 없어요.
          </Hb.Dialog.ContentText>
        </Hb.Dialog.Content>
        <Hb.Dialog.Actions>
          <Hb.Button onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
            취소
          </Hb.Button>
          <Hb.Button onClick={handleDelete} variant="danger" loading={isDeleting}>
            삭제
          </Hb.Button>
        </Hb.Dialog.Actions>
      </Hb.Dialog.Root>
      <MovePageDialog
        open={moveDialogOpen}
        onClose={() => setMoveDialogOpen(false)}
        onSubmit={handleMove}
        loading={isMoving}
        currentSpaceKey={spaceKey}
        currentPageId={pageId}
      />
      <CopyPageDialog
        open={copyDialogOpen}
        onClose={() => setCopyDialogOpen(false)}
        onSubmit={handleCopy}
        loading={isCopying}
        currentSpaceKey={spaceKey}
      />
    </Hb.Box>
  );
};
