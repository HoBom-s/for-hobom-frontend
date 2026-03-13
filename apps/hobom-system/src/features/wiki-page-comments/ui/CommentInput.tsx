import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

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
    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
      <TextField
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
      <LoadingButton
        variant="contained"
        size="small"
        onClick={handleSubmit}
        loading={loading}
        disabled={!content.trim()}
        sx={{ flexShrink: 0 }}
      >
        등록
      </LoadingButton>
    </Box>
  );
};
