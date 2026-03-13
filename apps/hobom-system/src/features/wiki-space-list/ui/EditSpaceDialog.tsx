import { useEffect, useState } from "react";
import type { SpaceType } from "@/entities/wiki-space";
import { Hb } from "@/shared/ui";

interface EditSpaceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { key: string; name: string; description: string }) => void;
  loading?: boolean;
  space: SpaceType | null;
}

export const EditSpaceDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  space,
}: EditSpaceDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (space && open) {
      setName(space.name);
      setDescription(space.description ?? "");
    }
  }, [space, open]);

  const handleSubmit = () => {
    if (!name.trim() || !space) return;
    onSubmit({
      key: space.key,
      name: name.trim(),
      description: description.trim(),
    });
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <Hb.Dialog.Title>스페이스 수정</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.Stack spacing={2} sx={{ mt: 1 }}>
          <Hb.TextField
            fullWidth
            label="스페이스 키"
            value={space?.key ?? ""}
            disabled
            helperText="스페이스 키는 변경할 수 없습니다"
          />
          <Hb.TextField
            autoFocus
            fullWidth
            label="스페이스 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Hb.TextField
            fullWidth
            label="설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
        </Hb.Stack>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button onClick={onClose} disabled={loading}>
          취소
        </Hb.Button>
        <Hb.Button
          onClick={handleSubmit}
          variant="primary"
          loading={loading}
          disabled={!name.trim()}
        >
          수정
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
