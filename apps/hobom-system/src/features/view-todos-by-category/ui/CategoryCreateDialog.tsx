import { useState } from "react";
import { Bom } from "hobom-utils";
import { useCreateCategory } from "@/entities/daily-todo";
import { Hb } from "@/shared/ui";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CategoryCreateDialog = ({ open, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const { mutate, isPending } = useCreateCategory();

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  const handleSubmit = () => {
    const trimmed = title.trim();

    if (Bom.isEmpty(trimmed)) return;
    mutate({ title: trimmed }, { onSuccess: handleClose });
  };

  return (
    <Hb.Dialog.Root open={open} onClose={handleClose} size="xs">
      <Hb.Dialog.Title sx={{ pb: 1 }}>카테고리 추가</Hb.Dialog.Title>
      <Hb.Dialog.Content sx={{ pt: "12px !important" }}>
        <Hb.TextField
          fullWidth
          autoFocus
          label="카테고리 이름"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Hb.Button fullWidth variant="secondary" onClick={handleClose}>
          취소
        </Hb.Button>
        <Hb.Button
          fullWidth
          variant="primary"
          loading={isPending}
          onClick={handleSubmit}
        >
          추가
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
