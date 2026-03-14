import { useState } from "react";
import { useCreateProject } from "@/entities/project";
import { Hb } from "@/shared/ui";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateProjectDialog = ({ open, onClose }: CreateProjectDialogProps) => {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateProject();

  const handleSubmit = () => {
    if (!key.trim() || !name.trim()) return;
    mutate(
      {
        key: key.trim().toUpperCase(),
        name: name.trim(),
        description: description || undefined,
      },
      {
        onSuccess: () => {
          onClose();
          setKey("");
          setName("");
          setDescription("");
        },
      },
    );
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <Hb.Dialog.Title>프로젝트 만들기</Hb.Dialog.Title>
      <Hb.Dialog.Content sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Hb.TextField
          label="프로젝트 키"
          placeholder="PROJ"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
          helperText="영문 대문자로 입력하세요 (예: PROJ)"
        />
        <Hb.TextField
          label="프로젝트 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
        <Hb.TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          size="small"
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions sx={{ px: 3, pb: 2 }}>
        <Hb.Button variant="secondary" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!key.trim() || !name.trim()}
          loading={isPending}
        >
          만들기
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
