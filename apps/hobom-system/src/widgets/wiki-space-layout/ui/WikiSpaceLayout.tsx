import { Suspense } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { AddOutlined, ChevronRight } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import {
  usePageTree,
  PageTreeView,
  CreatePageDialog,
} from "@/features/wiki-page-tree";
import { WikiSearchField } from "@/features/wiki-search";
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

export const WikiSpaceLayout = () => {
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
          onClick={handleNavigateToWiki}
        >
          위키
        </Typography>
        <ChevronRight sx={{ fontSize: 14, color: "text.disabled" }} />
        <Typography variant="caption" fontWeight={600} color="text.secondary">
          {space.name}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {space.name}
        </Typography>
        <WikiSearchField spaceKey={spaceKey} />
      </Box>

      <Divider sx={{ mb: 0 }} />

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 200px)" }}>
        <Box
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
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={24} />
              </Box>
            }
          >
            <PageTreeContent
              spaceKey={spaceKey}
              activePageId={pageId}
              onSelect={handlePageSelect}
              onCreateChild={handleCreateChild}
            />
          </Suspense>

          <Box sx={{ px: 1, mt: 1 }}>
            <Button
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
            </Button>
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet context={{ spaceKey }} />
        </Box>
      </Box>

      <CreatePageDialog
        open={createDialog.open}
        onClose={handleCloseDialog}
        onSubmit={handleCreatePage}
        loading={isCreating}
        parentTitle={createDialog.parentTitle}
      />
    </Box>
  );
};
