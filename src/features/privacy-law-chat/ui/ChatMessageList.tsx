import { useEffect, useRef } from "react";
import {
  Avatar,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GavelOutlined, PersonOutlined } from "@mui/icons-material";
import type { ChatMessage } from "../model/useChatSession";
import { ReferencedArticles } from "./ReferencedArticles";

interface Props {
  messages: ChatMessage[];
  isPending: boolean;
}

export const ChatMessageList = ({ messages, isPending }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isPending]);

  if (messages.length === 0 && !isPending) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1, py: 8 }}
      >
        <GavelOutlined sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          개인정보보호법 AI 상담
        </Typography>
        <Typography variant="body2" color="text.disabled">
          개인정보보호법에 대해 질문해보세요. 관련 조문을 참조하여 답변합니다.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={{ flex: 1, overflow: "auto", py: 2 }}>
      {messages.map((msg) => (
        <Stack
          key={msg.id}
          direction="row"
          spacing={1.5}
          alignItems="flex-start"
          sx={{
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: msg.role === "user" ? "primary.main" : "grey.700",
            }}
          >
            {msg.role === "user" ? (
              <PersonOutlined fontSize="small" />
            ) : (
              <GavelOutlined fontSize="small" />
            )}
          </Avatar>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              maxWidth: "70%",
              bgcolor: msg.role === "user" ? "primary.50" : "background.paper",
              border: 1,
              borderColor: msg.role === "user" ? "primary.200" : "divider",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {msg.content}
            </Typography>
            {msg.referencedArticles && msg.referencedArticles.length > 0 && (
              <ReferencedArticles articles={msg.referencedArticles} />
            )}
          </Paper>
        </Stack>
      ))}

      {isPending && (
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Avatar sx={{ width: 32, height: 32, bgcolor: "grey.700" }}>
            <GavelOutlined fontSize="small" />
          </Avatar>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={16} />
              <Typography variant="body2" color="text.secondary">
                답변 생성 중...
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      )}

      <div ref={bottomRef} />
    </Stack>
  );
};
