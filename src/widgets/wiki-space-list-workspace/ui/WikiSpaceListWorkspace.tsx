import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import {
  useCreateSpace,
  useUpdateSpace,
  useDeleteSpace,
  type SpaceType,
} from "@/entities/wiki-space";
import {
  SpaceGrid,
  CreateSpaceDialog,
  EditSpaceDialog,
  DeleteSpaceDialog,
} from "@/features/wiki-space-list";
import { useOverlay } from "@/shared/model";
import { SuspenseLoader } from "@/shared/ui";

export const WikiSpaceListWorkspace = () => {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [editSpace, setEditSpace] = useState<SpaceType | null>(null);
  const createMutation = useCreateSpace();
  const updateMutation = useUpdateSpace();
  const deleteMutation = useDeleteSpace();
  const { onOpen } = useOverlay();

  const handleCreateSpace = (data: {
    key: string;
    name: string;
    description: string;
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => setCreateOpen(false),
    });
  };

  const handleUpdateSpace = (data: {
    key: string;
    name: string;
    description: string;
  }) => {
    updateMutation.mutate(data, {
      onSuccess: () => setEditSpace(null),
    });
  };

  const handleOpenDeleteDialog = (space: SpaceType) => {
    onOpen(({ isOpen, onClose, onExit }) => (
      <DeleteSpaceDialog
        isOpen={isOpen}
        onClose={onClose}
        onExit={onExit}
        space={space}
        onConfirm={(key) => {
          deleteMutation.mutate({ key }, { onSuccess: onClose });
        }}
        isPending={deleteMutation.isPending}
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

      <Suspense fallback={<SuspenseLoader />}>
        <SpaceGrid
          onSpaceClick={(key) => navigate(`/wiki/${key}`)}
          onEdit={setEditSpace}
          onDelete={handleOpenDeleteDialog}
        />
      </Suspense>

      <CreateSpaceDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSpace}
        loading={createMutation.isPending}
      />

      <EditSpaceDialog
        open={Boolean(editSpace)}
        onClose={() => setEditSpace(null)}
        onSubmit={handleUpdateSpace}
        loading={updateMutation.isPending}
        space={editSpace}
      />
    </Box>
  );
};
