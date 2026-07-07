import { useState } from "react";
import { Hb } from "@/shared/ui";

interface IssueCommentInputProps {
  onSubmit: (body: string) => void;
  loading?: boolean;
}

export const IssueCommentInput = ({ onSubmit, loading }: IssueCommentInputProps) => {
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    const trimmed = body.trim();

    if (!trimmed) return;
    onSubmit(trimmed);
    setBody("");
  };

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <Hb.TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={4}
        size="small"
        placeholder="댓글을 입력하세요..."
        aria-label="댓글"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Hb.Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Hb.Button
          variant="primary"
          size="small"
          onClick={handleSubmit}
          disabled={!body.trim()}
          loading={loading}
        >
          등록
        </Hb.Button>
      </Hb.Box>
    </Hb.Box>
  );
};
