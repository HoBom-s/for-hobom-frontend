import { useState } from "react";
import type { SpaceType } from "@/entities/wiki-space";
import { Hb } from "@/shared/ui";

interface DeleteSpaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  space: SpaceType;
  onConfirm: (key: string) => void;
  isPending: boolean;
}

export const DeleteSpaceDialog = ({
  isOpen,
  onClose,
  space,
  onConfirm,
  isPending,
}: DeleteSpaceDialogProps) => {
  const [confirmInput, setConfirmInput] = useState("");

  const handleClose = () => {
    setConfirmInput("");
    onClose();
  };

  return (
    <Hb.Dialog.Root open={isOpen} onClose={handleClose} size="xs">
      <Hb.Dialog.Title>스페이스 삭제</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.Text
          variant="body2"
          color="text.secondary"
          style={{
            marginBottom: 16,
          }}
        >
          <strong>&quot;{space.name}&quot;</strong> 스페이스를 삭제할까요?
          <br />
          스페이스 내 모든 페이지와 댓글이 함께 삭제돼요.
        </Hb.Text>
        <Hb.Text
          variant="body2"
          style={{
            marginBottom: 8,
          }}
        >
          확인을 위해 스페이스 키 <strong>{space.key}</strong>를 입력하세요.
        </Hb.Text>
        <Hb.TextField
          fullWidth
          size="small"
          placeholder={space.key}
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          autoFocus
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16
      }}>
        <Hb.Button variant="secondary" onClick={handleClose}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="danger"
          onClick={() => onConfirm(space.key)}
          disabled={confirmInput !== space.key}
          loading={isPending}
        >
          삭제
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
