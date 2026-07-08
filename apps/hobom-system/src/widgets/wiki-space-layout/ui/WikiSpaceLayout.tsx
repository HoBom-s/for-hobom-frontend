import { Suspense, useState } from "react";
import {
  AddOutlined,
  ChevronRight,
  DeleteOutlined,
  LabelOutlined,
} from "hobom-design-system/icons";
import { Outlet } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { usePageTree, PageTreeView, CreatePageDialog } from "@/features/wiki-page-tree";
import { TrashPageList } from "@/features/wiki-page-trash";
import { LabelList } from "@/features/wiki-label-manager";
import { WikiSearchField } from "@/features/wiki-search";
import { Hb, ErrorBoundary } from "@/shared/ui";
import { useWikiSpaceLayout } from "../model/useWikiSpaceLayout";

const styles = stylex.create({
  crumb: {
    color: "var(--hb-color-text-disabled)",
    cursor: "pointer",
    ":hover": { color: "var(--hb-color-accent)" },
  },
  sidebarButton: {
    width: "100%",
    justifyContent: "flex-start",
    textTransform: "none",
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
});

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
    style={{ width: 400 }}
  >
    <Hb.Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: "1px solid",
        borderColor: "var(--hb-color-border)",
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
          <Hb.Box
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 48,
              paddingBottom: 48,
            }}
          >
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
    style={{ width: 360 }}
  >
    <Hb.Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: "1px solid",
        borderColor: "var(--hb-color-border)",
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
          <Hb.Box
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 48,
              paddingBottom: 48,
            }}
          >
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
    <Hb.Box
      style={{
        padding: 24,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 8,
        }}
      >
        <Hb.Text variant="caption" {...stylex.props(styles.crumb)} onClick={handleNavigateToWiki}>
          위키
        </Hb.Text>
        <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
        <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
          {space.name}
        </Hb.Text>
      </Hb.Box>
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Hb.Text variant="h5" fontWeight={700}>
          {space.name}
        </Hb.Text>
        <WikiSearchField spaceKey={spaceKey} />
      </Hb.Box>
      <Hb.Divider
        style={{
          marginBottom: 0,
        }}
      />
      <Hb.Box
        style={{
          display: "flex",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        <Hb.Box
          style={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            borderRight: "1px solid",
            borderColor: "var(--hb-color-border)",
            paddingTop: 12,
            paddingBottom: 12,
            paddingRight: 8,
            overflow: "auto",
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

          <Hb.Box
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Hb.Button
              variant="ghost"
              size="small"
              startIcon={<AddOutlined />}
              onClick={handleOpenCreateDialog}
              {...stylex.props(styles.sidebarButton)}
            >
              새 페이지
            </Hb.Button>
            <Hb.Button
              variant="ghost"
              size="small"
              startIcon={<LabelOutlined />}
              onClick={() => setLabelDrawerOpen(true)}
              {...stylex.props(styles.sidebarButton)}
            >
              라벨 관리
            </Hb.Button>
            <Hb.Button
              variant="ghost"
              size="small"
              startIcon={<DeleteOutlined />}
              onClick={() => setTrashDrawerOpen(true)}
              {...stylex.props(styles.sidebarButton)}
            >
              휴지통
            </Hb.Button>
          </Hb.Box>
        </Hb.Box>

        <Hb.Box
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
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
