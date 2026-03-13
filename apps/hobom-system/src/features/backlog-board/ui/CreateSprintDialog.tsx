import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCreateSprint } from "@/entities/sprint";

interface CreateSprintDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export const CreateSprintDialog = ({
  open,
  onClose,
  projectId,
}: CreateSprintDialogProps) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { mutate, isPending } = useCreateSprint();

  const isDateInvalid = startDate && endDate && endDate < startDate;

  const handleSubmit = () => {
    if (!name.trim() || !startDate || !endDate || isDateInvalid) return;
    mutate(
      { projectId, name: name.trim(), startDate, endDate },
      {
        onSuccess: () => {
          onClose();
          setName("");
          setStartDate("");
          setEndDate("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>스프린트 만들기</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="스프린트 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="시작일"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="종료일"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!isDateInvalid}
            helperText={
              isDateInvalid ? "종료일은 시작일 이후여야 해요" : undefined
            }
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!name.trim() || !startDate || !endDate || !!isDateInvalid}
          loading={isPending}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
