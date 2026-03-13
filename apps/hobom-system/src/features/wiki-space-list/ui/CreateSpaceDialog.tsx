import { useState } from "react";
import { Hb } from "@/shared/ui";

interface CreateSpaceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { key: string; name: string; description: string }) => void;
  loading?: boolean;
}

export const CreateSpaceDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
}: CreateSpaceDialogProps) => {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!key.trim() || !name.trim()) return;
    onSubmit({
      key: key.trim().toUpperCase(),
      name: name.trim(),
      description: description.trim(),
    });
    resetForm();
  };

  const resetForm = () => {
    setKey("");
    setName("");
    setDescription("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Hb.Dialog.Root open={open} onClose={handleClose} size="sm">
      <Hb.Dialog.Title>새 스페이스</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.Stack spacing={2} sx={{ mt: 1 }}>
          <Hb.TextField
            autoFocus
            fullWidth
            label="스페이스 키"
            placeholder="TEAM"
            value={key}
            onChange={(e) =>
              setKey(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))
            }
            helperText="영문, 숫자, 하이픈만 사용 가능"
            slotProps={{ htmlInput: { maxLength: 20 } }}
          />
          <Hb.TextField
            fullWidth
            label="스페이스 이름"
            placeholder="팀 위키"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Hb.TextField
            fullWidth
            label="설명"
            placeholder="스페이스에 대한 간략한 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
        </Hb.Stack>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button onClick={handleClose}>취소</Hb.Button>
        <Hb.Button
          onClick={handleSubmit}
          variant="primary"
          loading={loading}
          disabled={!key.trim() || !name.trim()}
        >
          생성
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
