import type { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  confirmColor?: "primary" | "success" | "error";
  onConfirm: () => void;
  isPending?: boolean;
}

export const ConfirmDialog = ({
  open,
  onClose,
  title,
  description,
  confirmLabel = "확인",
  confirmColor = "primary",
  onConfirm,
  isPending = false,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography variant="body2" color="text.secondary" component="div">
        {description}
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button variant="outlined" color="inherit" onClick={onClose}>
        취소
      </Button>
      <Button variant="contained" color={confirmColor} onClick={onConfirm} loading={isPending}>
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
