import { useState } from "react";
import type { NoteRecurrence } from "@/entities/note";
import { Hb } from "@/shared/ui";

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

export const ReminderPickerPopover = ({ anchorEl, onClose, onSet }: ReminderPickerPopoverProps) => {
  const [date, setDate] = useState("");
  const [recurrence, setRecurrence] = useState<NoteRecurrence>("NONE");

  const handleSet = () => {
    if (!date) return;
    onSet(date, recurrence);
    onClose();
  };

  return (
    <Hb.Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Hb.Box
        style={{
          padding: 12,
          minWidth: 240,
        }}
      >
        <Hb.Text variant="caption" fontWeight={600}>
          리마인더 설정
        </Hb.Text>
        <Hb.TextField
          type="datetime-local"
          fullWidth
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mt: 1 }}
        />
        <Hb.Form.Select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as NoteRecurrence)}
          size="small"
          fullWidth
          sx={{ mt: 1 }}
        >
          {RECURRENCE_OPTIONS.map((opt) => (
            <Hb.Form.Option key={opt.value} value={opt.value}>
              {opt.label}
            </Hb.Form.Option>
          ))}
        </Hb.Form.Select>
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 8,
          }}
        >
          <Hb.Button
            size="small"
            onClick={handleSet}
            disabled={!date}
            style={{
              textTransform: "none",
            }}
          >
            설정
          </Hb.Button>
        </Hb.Box>
      </Hb.Box>
    </Hb.Popover>
  );
};
