import { Suspense, useState } from "react";
import {
  AddOutlined,
  ChevronRight,
  DeleteOutlined,
  LabelOutlined,
} from "hobom-design-system/icons";
import { Outlet } from "react-router-dom";
import { usePageTree, PageTreeView, CreatePageDialog } from "@/features/wiki-page-tree";
import { TrashPageList } from "@/features/wiki-page-trash";
import { LabelList } from "@/features/wiki-label-manager";
import { WikiSearchField } from "@/features/wiki-search";
import { Hb, ErrorBoundary } from "@/shared/ui";
import { useWikiSpaceLayout } from "../model/useWikiSpaceLayout";

const SIDEBAR_WIDTH = 260;

const PageTreeContent = ({
  spaceKey,
  activePageId,
  onSelect,
  onCreateChild,
}: {
  spaceKey: string;
  activePageId?: string;
  onSelect: (pageId: string) => void;
  onCreateChild: (parentId: string, parentTitle: string) => void;
}) => {
  const { data } = usePageTree(spaceKey);

  return (
    <PageTreeView
      nodes={data.items}
      activePageId={activePageId}
      onSelect={onSelect}
      onCreateChild={onCreateChild}
    />
  );
};

const TrashDrawer = ({
  open,
  onClose,
  spaceKey,
}: {
  open: boolean;
  onClose: () => void;
  spaceKey: string;
}) => (
  <Hb.Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    slotProps={{ paper: { sx: { width: 400 } } }}
  >
    <Hb.Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.5,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Hb.Text variant="h6" fontWeight={700}>
        휴지통
      </Hb.Text>
      <Hb.Button.Icon onClick={onClose} size="small" aria-label="휴지통 닫기">
        <ChevronRight fontSize="small" />
      </Hb.Button.Icon>
    </Hb.Box>
    <ErrorBoundary inline resetKey={spaceKey}>
      <Suspense
        fallback={
          <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <Hb.Progress.Circular size={28} />
          </Hb.Box>
        }
      >
        <TrashPageList spaceKey={spaceKey} />
      </Suspense>
    </ErrorBoundary>
  </Hb.Drawer>
);

const LabelDrawer = ({
  open,
  onClose,
  spaceKey,
}: {
  open: boolean;
  onClose: () => void;
  spaceKey: string;
}) => (
  <Hb.Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    slotProps={{ paper: { sx: { width: 360 } } }}
  >
    <Hb.Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.5,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Hb.Text variant="h6" fontWeight={700}>
        라벨 관리
      </Hb.Text>
      <Hb.Button.Icon onClick={onClose} size="small" aria-label="라벨 관리 닫기">
        <ChevronRight fontSize="small" />
      </Hb.Button.Icon>
    </Hb.Box>
    <ErrorBoundary inline resetKey={spaceKey}>
      <Suspense
        fallback={
          <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <Hb.Progress.Circular size={28} />
          </Hb.Box>
        }
      >
        <LabelList spaceKey={spaceKey} />
      </Suspense>
    </ErrorBoundary>
  </Hb.Drawer>
);

export const WikiSpaceLayout = () => {
  const [trashDrawerOpen, setTrashDrawerOpen] = useState(false);
  const [labelDrawerOpen, setLabelDrawerOpen] = useState(false);
  const {
    spaceKey,
    pageId,
    space,
    createDialog,
    handleNavigateToWiki,
    handlePageSelect,
    handleCreateChild,
    handleCreatePage,
    handleCloseDialog,
    handleOpenCreateDialog,
    isCreating,
  } = useWikiSpaceLayout();

  if (!spaceKey) return null;

  return (
    <Hb.Box sx={{ p: 3 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
        <Hb.Text
          variant="caption"
          sx={{
            color: "text.disabled",
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
          onClick={handleNavigateToWiki}
        >
          위키
        </Hb.Text>
        <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
        <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
          {space.name}
        </Hb.Text>
      </Hb.Box>

      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Hb.Text variant="h5" fontWeight={700}>
          {space.name}
        </Hb.Text>
        <WikiSearchField spaceKey={spaceKey} />
      </Hb.Box>

      <Hb.Divider sx={{ mb: 0 }} />

      <Hb.Box sx={{ display: "flex", minHeight: "calc(100vh - 200px)" }}>
        <Hb.Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            borderRight: "1px solid",
            borderColor: "divider",
            py: 1.5,
            pr: 1,
            overflow: "auto",
          }}
        >
          <Suspense
            fallback={
              <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <Hb.Progress.Circular size={24} />
              </Hb.Box>
            }
          >
            <PageTreeContent
              spaceKey={spaceKey}
              activePageId={pageId}
              onSelect={handlePageSelect}
              onCreateChild={handleCreateChild}
            />
          </Suspense>

          <Hb.Box sx={{ px: 1, mt: 1, display: "flex", flexDirection: "column", gap: 0.25 }}>
            <Hb.Button
              variant="ghost"
              size="small"
              startIcon={<AddOutlined />}
              onClick={handleOpenCreateDialog}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "0.8125rem",
                color: "text.secondary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              새 페이지
            </Hb.Button>
            <Hb.Button
              variant="ghost"
              size="small"
              startIcon={<LabelOutlined />}
              onClick={() => setLabelDrawerOpen(true)}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "0.8125rem",
                color: "text.secondary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              라벨 관리
            </Hb.Button>
            <Hb.Button
              variant="ghost"
              size="small"
              startIcon={<DeleteOutlined />}
              onClick={() => setTrashDrawerOpen(true)}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "0.8125rem",
                color: "text.secondary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              휴지통
            </Hb.Button>
          </Hb.Box>
        </Hb.Box>

        <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet context={{ spaceKey }} />
        </Hb.Box>
      </Hb.Box>

      <CreatePageDialog
        open={createDialog.open}
        onClose={handleCloseDialog}
        onSubmit={handleCreatePage}
        loading={isCreating}
        parentTitle={createDialog.parentTitle}
      />

      <TrashDrawer
        open={trashDrawerOpen}
        onClose={() => setTrashDrawerOpen(false)}
        spaceKey={spaceKey}
      />
      <LabelDrawer
        open={labelDrawerOpen}
        onClose={() => setLabelDrawerOpen(false)}
        spaceKey={spaceKey}
      />
    </Hb.Box>
  );
};
