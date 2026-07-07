import { useState } from "react";
import { Hb } from "@/shared/ui";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  loading?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export const CommentInput = ({
  onSubmit,
  loading = false,
  placeholder = "댓글을 입력하세요...",
  autoFocus = false,
}: CommentInputProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const trimmed = content.trim();

    if (!trimmed) return;
    onSubmit(trimmed);
    setContent("");
  };

  return (
    <Hb.Box
      style={{
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      <Hb.TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        size="small"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
        }}
        autoFocus={autoFocus}
      />
      <Hb.Button
        variant="primary"
        size="small"
        onClick={handleSubmit}
        loading={loading}
        disabled={!content.trim()}
        style={{
          flexShrink: 0,
        }}
      >
        등록
      </Hb.Button>
    </Hb.Box>
  );
};
