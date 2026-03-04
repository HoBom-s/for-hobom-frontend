import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  useUpdateFutureMessage,
  type FutureMessageType,
} from "@/entities/future-message";

interface Props {
  message: FutureMessageType;
  open: boolean;
  onClose: () => void;
}

export const FutureMessageEditDialog = ({ message, open, onClose }: Props) => {
  const [title, setTitle] = useState(message.title);
  const [content, setContent] = useState(message.content);
  const { mutate, isPending } = useUpdateFutureMessage();

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutate(
      { id: message.id, title: title.trim(), content: content.trim() },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>메시지 수정</DialogTitle>
      <DialogContent sx={{ pt: "12px !important" }}>
        <TextField
          fullWidth
          autoFocus
          label="제목"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="내용"
          size="small"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button fullWidth variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          loading={isPending}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};
