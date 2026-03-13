import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface IssueCommentInputProps {
  onSubmit: (body: string) => void;
  loading?: boolean;
}

export const IssueCommentInput = ({
  onSubmit,
  loading,
}: IssueCommentInputProps) => {
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    const trimmed = body.trim();

    if (!trimmed) return;
    onSubmit(trimmed);
    setBody("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          disabled={!body.trim()}
          loading={loading}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
};
