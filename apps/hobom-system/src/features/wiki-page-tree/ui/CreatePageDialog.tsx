import { useEffect, useRef, useState } from "react";
import { Hb } from "@/shared/ui";

interface CreatePageDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  loading?: boolean;
  parentTitle?: string;
}

export const CreatePageDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  parentTitle,
}: CreatePageDialogProps) => {
  const [title, setTitle] = useState("");
  const submittedRef = useRef(false);

  useEffect(() => {
    if (!open) {
      setTitle("");
      submittedRef.current = false;
    }
  }, [open]);

  const handleSubmit = () => {
    if (loading || submittedRef.current) return;
    const trimmed = title.trim();

    if (!trimmed) return;
    submittedRef.current = true;
    onSubmit(trimmed);
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="xs">
      <Hb.Dialog.Title>
        {parentTitle ? `"${parentTitle}" 하위 페이지 생성` : "새 페이지"}
      </Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.TextField
          autoFocus
          fullWidth
          label="페이지 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          disabled={loading}
          style={{
            marginTop: 8
          }}
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button onClick={onClose} disabled={loading}>
          취소
        </Hb.Button>
        <Hb.Button
          onClick={handleSubmit}
          variant="primary"
          loading={loading}
          disabled={!title.trim()}
        >
          생성
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
