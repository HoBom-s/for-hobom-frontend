import { Suspense } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import type { SpaceType } from "@/entities/wiki-space";
import {
  SpaceGrid,
  CreateSpaceDialog,
  EditSpaceDialog,
  DeleteSpaceDialog,
} from "@/features/wiki-space-list";
import { useOverlay } from "@/shared/model";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { useSpaceListWorkspace } from "../model/useSpaceListWorkspace";

export const WikiSpaceListWorkspace = () => {
  const {
    handleNavigateToSpace,
    createOpen,
    setCreateOpen,
    editSpace,
    setEditSpace,
    handleCreateSpace,
    handleUpdateSpace,
    handleDeleteSpace,
    isCreating,
    isUpdating,
    isDeleting,
  } = useSpaceListWorkspace();
  const { onOpen } = useOverlay();

  const handleOpenDeleteDialog = (space: SpaceType) => {
    onOpen(({ isOpen, onClose, onExit }) => (
      <DeleteSpaceDialog
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
        space={space}
        onConfirm={(key) => handleDeleteSpace(key, onClose)}
        isPending={isDeleting}
      />
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
            위키
          </Typography>
          <Typography variant="body2" color="text.secondary">
            팀의 지식을 문서화하고 공유하세요.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setCreateOpen(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
          }}
        >
          새 스페이스
        </Button>
      </Box>

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <SpaceGrid
            onSpaceClick={handleNavigateToSpace}
            onEdit={setEditSpace}
            onDelete={handleOpenDeleteDialog}
          />
        </Suspense>
      </ErrorBoundary>

      <CreateSpaceDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSpace}
        loading={isCreating}
      />

      <EditSpaceDialog
        open={Boolean(editSpace)}
        onClose={() => setEditSpace(null)}
        onSubmit={handleUpdateSpace}
        loading={isUpdating}
        space={editSpace}
      />
    </Box>
  );
};
