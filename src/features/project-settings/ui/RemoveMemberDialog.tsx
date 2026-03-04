import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface RemoveMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  onConfirm: () => void;
  isPending: boolean;
}

export const RemoveMemberDialog = ({
  isOpen,
  onClose,
  memberName,
  onConfirm,
  isPending,
}: RemoveMemberDialogProps) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>멤버 제거</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary">
        <strong>"{memberName}"</strong> 님을 프로젝트에서 제거하시겠어요?
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
        제거
      </Button>
    </DialogActions>
  </Dialog>
);
