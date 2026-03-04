import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
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
} from "@/features/wiki-space-list";

export const WikiSpaceListWorkspace = () => {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [editSpace, setEditSpace] = useState<SpaceType | null>(null);
  const [deleteSpace, setDeleteSpace] = useState<SpaceType | null>(null);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const createMutation = useCreateSpace();
  const updateMutation = useUpdateSpace();
  const deleteMutation = useDeleteSpace();

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

  const handleCloseDelete = () => {
    setDeleteSpace(null);
    setDeleteConfirmInput("");
  };

  const handleDeleteSpace = () => {
    if (!deleteSpace || deleteConfirmInput !== deleteSpace.key) return;
    deleteMutation.mutate(
      { key: deleteSpace.key },
      { onSuccess: handleCloseDelete },
    );
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

      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        }
      >
        <SpaceGrid
          onSpaceClick={(key) => navigate(`/wiki/${key}`)}
          onEdit={setEditSpace}
          onDelete={setDeleteSpace}
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

      <Dialog
        open={Boolean(deleteSpace)}
        onClose={handleCloseDelete}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>스페이스 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <strong>&quot;{deleteSpace?.name}&quot;</strong> 스페이스를
            삭제할까요?
            <br />
            스페이스 내 모든 페이지와 댓글이 함께 삭제돼요.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            확인을 위해 스페이스 키 <strong>{deleteSpace?.key}</strong>를
            입력하세요.
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder={deleteSpace?.key}
            value={deleteConfirmInput}
            onChange={(e) => setDeleteConfirmInput(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleCloseDelete}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSpace}
            disabled={deleteConfirmInput !== deleteSpace?.key}
            loading={deleteMutation.isPending}
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
