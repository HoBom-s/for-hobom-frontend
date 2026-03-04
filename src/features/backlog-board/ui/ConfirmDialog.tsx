import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  isPending: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  isPending,
}: ConfirmDialogProps) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button variant="outlined" color="inherit" onClick={onClose}>
        취소
      </Button>
      <Button variant="contained" onClick={onConfirm} loading={isPending}>
        확인
      </Button>
    </DialogActions>
  </Dialog>
);
