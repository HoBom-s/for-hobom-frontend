import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { NoteRecurrence } from "@/entities/note";

const RECURRENCE_OPTIONS: { value: NoteRecurrence; label: string }[] = [
  { value: "NONE", label: "반복 없음" },
  { value: "DAILY", label: "매일" },
  { value: "WEEKLY", label: "매주" },
  { value: "MONTHLY", label: "매월" },
];

interface ReminderPickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSet: (date: string, recurrence: NoteRecurrence) => void;
}

export const ReminderPickerPopover = ({
  anchorEl,
  onClose,
  onSet,
}: ReminderPickerPopoverProps) => {
  const [date, setDate] = useState("");
  const [recurrence, setRecurrence] = useState<NoteRecurrence>("NONE");

  const handleSet = () => {
    if (!date) return;
    onSet(date, recurrence);
    onClose();
  };

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 1.5, minWidth: 240 }}>
        <Typography variant="caption" fontWeight={600}>
          리마인더 설정
        </Typography>
        <TextField
          type="datetime-local"
          fullWidth
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as NoteRecurrence)}
          size="small"
          fullWidth
          sx={{ mt: 1 }}
        >
          {RECURRENCE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            size="small"
            onClick={handleSet}
            disabled={!date}
            sx={{ textTransform: "none" }}
          >
            설정
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};
