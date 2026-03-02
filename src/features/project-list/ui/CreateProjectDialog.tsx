import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { key: string; name: string; description?: string }) => void;
}

export const CreateProjectDialog = ({
  open,
  onClose,
  onSubmit,
}: CreateProjectDialogProps) => {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!key.trim() || !name.trim()) return;
    onSubmit({
      key: key.trim().toUpperCase(),
      name: name.trim(),
      description: description || undefined,
    });
    onClose();
    setKey("");
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>프로젝트 만들기</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="프로젝트 키"
          placeholder="PROJ"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
          helperText="영문 대문자로 입력하세요 (예: PROJ)"
        />
        <TextField
          label="프로젝트 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          size="small"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!key.trim() || !name.trim()}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
