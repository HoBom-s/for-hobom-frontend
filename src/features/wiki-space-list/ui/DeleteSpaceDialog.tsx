import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import type { SpaceType } from "@/entities/wiki-space";

interface DeleteSpaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  space: SpaceType;
  onConfirm: (key: string) => void;
  isPending: boolean;
}

export const DeleteSpaceDialog = ({
  isOpen,
  onClose,
  space,
  onConfirm,
  isPending,
}: DeleteSpaceDialogProps) => {
  const [confirmInput, setConfirmInput] = useState("");

  const handleClose = () => {
    setConfirmInput("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>스페이스 삭제</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>&quot;{space.name}&quot;</strong> 스페이스를 삭제할까요?
          <br />
          스페이스 내 모든 페이지와 댓글이 함께 삭제돼요.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          확인을 위해 스페이스 키 <strong>{space.key}</strong>를 입력하세요.
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder={space.key}
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => onConfirm(space.key)}
          disabled={confirmInput !== space.key}
          loading={isPending}
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};
