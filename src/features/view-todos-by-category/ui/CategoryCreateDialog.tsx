import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Bom } from "@/packages/bom";
import { useCreateCategory } from "@/entities/daily-todo";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CategoryCreateDialog = ({ open, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateCategory();

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  const handleSubmit = () => {
    const trimmed = title.trim();
    if (Bom.isEmpty(trimmed)) return;
    mutate({ title: trimmed }, { onSuccess: handleClose });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>카테고리 추가</DialogTitle>
      <DialogContent sx={{ pt: "12px !important" }}>
        <TextField
          fullWidth
          autoFocus
          variant="outlined"
          label="카테고리 이름"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={handleClose}
        >
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          loading={isPending}
          onClick={handleSubmit}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};
