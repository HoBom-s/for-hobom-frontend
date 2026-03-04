import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  onConfirm: () => void;
  isPending: boolean;
}

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  projectName,
  onConfirm,
  isPending,
}: DeleteConfirmDialogProps) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>프로젝트 삭제</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary">
        <strong>"{projectName}"</strong> 프로젝트를 삭제하시겠어요?
        <br />이 작업은 되돌릴 수 없으며, 모든 이슈와 스프린트가 삭제됩니다.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button variant="outlined" color="inherit" onClick={onClose}>
        취소
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={onConfirm}
        loading={isPending}
      >
        삭제
      </Button>
    </DialogActions>
  </Dialog>
);
