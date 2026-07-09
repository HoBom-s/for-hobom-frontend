import { useState } from "react";
import { useUpdateFutureMessage, type FutureMessageType } from "@/entities/future-message";
import { Hb } from "@/shared/ui";

interface Props {
  message: FutureMessageType;
  open: boolean;
  onClose: () => void;
}

export const FutureMessageEditDialog = ({ message, open, onClose }: Props) => {
  const [title, setTitle] = useState(message.title);
  const [content, setContent] = useState(message.content);
  const { mutate, isPending } = useUpdateFutureMessage();

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutate(
      { id: message.id, title: title.trim(), content: content.trim() },
      { onSuccess: onClose },
    );
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <Hb.Dialog.Title style={{
        paddingBottom: 8
      }}>메시지 수정</Hb.Dialog.Title>
      <Hb.Dialog.Content style={{ paddingTop: 12 }}>
        <Hb.TextField
          fullWidth
          autoFocus
          label="제목"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            marginBottom: 16
          }}
        />
        <Hb.TextField
          fullWidth
          label="내용"
          size="small"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        gap: 8
      }}>
        <Hb.Button fullWidth variant="secondary" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button fullWidth variant="primary" loading={isPending} onClick={handleSubmit}>
          저장
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
