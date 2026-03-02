import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  type IssueKind,
  type IssuePriority,
} from "@/entities/issue";

interface CreateIssueDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    kind: IssueKind;
    priority: IssuePriority;
  }) => void;
}

export const CreateIssueDialog = ({
  open,
  onClose,
  onSubmit,
}: CreateIssueDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<IssueKind>("TASK");
  const [priority, setPriority] = useState<IssuePriority>("MEDIUM");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description || undefined,
      kind,
      priority,
    });
    onClose();
    setTitle("");
    setDescription("");
    setKind("TASK");
    setPriority("MEDIUM");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>이슈 만들기</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>유형</InputLabel>
            <Select
              value={kind}
              label="유형"
              onChange={(e) => setKind(e.target.value as IssueKind)}
            >
              {Object.entries(ISSUE_KIND_LABEL).map(([k, label]) => (
                <MenuItem key={k} value={k}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>우선순위</InputLabel>
            <Select
              value={priority}
              label="우선순위"
              onChange={(e) => setPriority(e.target.value as IssuePriority)}
            >
              {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
                <MenuItem key={k} value={k}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim()}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
