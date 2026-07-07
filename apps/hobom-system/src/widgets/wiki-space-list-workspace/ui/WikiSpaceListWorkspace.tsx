import { Suspense } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import type { SpaceType } from "@/entities/wiki-space";
import {
  SpaceGrid,
  CreateSpaceDialog,
  EditSpaceDialog,
  DeleteSpaceDialog,
} from "@/features/wiki-space-list";
import { useOverlay } from "@/shared/model";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { useSpaceListWorkspace } from "../model/useSpaceListWorkspace";

const styles = stylex.create({
  createButton: {
    borderRadius: 16,
    textTransform: "none",
    fontWeight: 600,
    boxShadow: "none",
    ":hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
  },
});

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
    <Hb.Box
      style={{
        padding: 24,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <Hb.Box>
          <Hb.Text
            variant="h5"
            fontWeight={700}
            style={{
              marginBottom: 4,
            }}
          >
            위키
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary">
            팀의 지식을 문서화하고 공유하세요.
          </Hb.Text>
        </Hb.Box>
        <Hb.Button
          variant="primary"
          startIcon={<AddOutlined />}
          onClick={() => setCreateOpen(true)}
          {...stylex.props(styles.createButton)}
        >
          새 스페이스
        </Hb.Button>
      </Hb.Box>
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
    </Hb.Box>
  );
};
