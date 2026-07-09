import { useState } from "react";
import { useCreateSprint } from "@/entities/sprint";
import { Hb } from "@/shared/ui";

interface CreateSprintDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export const CreateSprintDialog = ({ open, onClose, projectId }: CreateSprintDialogProps) => {
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
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <Hb.Dialog.Title>스프린트 만들기</Hb.Dialog.Title>
      <Hb.Dialog.Content style={{
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}>
        <Hb.TextField
          label="스프린트 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
          style={{
            marginTop: 8
          }}
        />
        <Hb.Box
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <Hb.TextField
            label="시작일"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <Hb.TextField
            label="종료일"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!isDateInvalid}
            helperText={isDateInvalid ? "종료일은 시작일 이후여야 해요" : undefined}
          />
        </Hb.Box>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16
      }}>
        <Hb.Button variant="secondary" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!name.trim() || !startDate || !endDate || !!isDateInvalid}
          loading={isPending}
        >
          만들기
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
