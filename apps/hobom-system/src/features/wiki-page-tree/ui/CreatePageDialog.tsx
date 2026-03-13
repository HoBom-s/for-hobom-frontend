import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface CreatePageDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  loading?: boolean;
  parentTitle?: string;
}

export const CreatePageDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  parentTitle,
}: CreatePageDialogProps) => {
  const [title, setTitle] = useState("");
  const submittedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      submittedRef.current = false;
    }
  }, [open]);

  const handleSubmit = () => {
    if (loading || submittedRef.current) return;
    const trimmed = title.trim();

    if (!trimmed) return;
    submittedRef.current = true;
    onSubmit(trimmed);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {parentTitle ? `"${parentTitle}" 하위 페이지 생성` : "새 페이지"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="페이지 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          disabled={loading}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          취소
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          loading={loading}
          disabled={!title.trim()}
        >
          생성
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
