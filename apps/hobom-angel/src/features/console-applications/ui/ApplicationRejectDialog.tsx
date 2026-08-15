import { useState } from "react";
import { Hb } from "hobom-design-system";

interface ApplicationRejectDialogProps {
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

/** Collect the required reason before rejecting an application. */
export const ApplicationRejectDialog = ({ onConfirm, onClose }: ApplicationRejectDialogProps) => {
  const [reason, setReason] = useState("");
  const canSubmit = reason.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;

    onConfirm(reason.trim());
    onClose();
  };

  return (
    <Hb.Dialog.Root open onClose={onClose} size="xs">
      <Hb.Dialog.Title>신청 반려</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <Hb.TextField
          label="반려 사유"
          placeholder="신청자에게 전달할 반려 사유를 입력하세요"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          multiline
          minRows={3}
          fullWidth
          autoFocus
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button variant="ghost" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button variant="danger" onClick={submit} disabled={!canSubmit}>
          반려하기
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
