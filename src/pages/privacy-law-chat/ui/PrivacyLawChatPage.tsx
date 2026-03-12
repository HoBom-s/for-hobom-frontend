import {
  Alert,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import {
  useChatSession,
  ChatMessageList,
  ChatInput,
} from "@/features/privacy-law-chat";

const PrivacyLawChatPage = () => {
  const { messages, sendMessage, clearMessages, isPending } = useChatSession();

  return (
    <Stack sx={{ height: "calc(100vh - 240px)", minHeight: 400 }}>
      <Alert severity="info" variant="outlined" sx={{ mb: 1.5 }}>
        <Typography variant="caption" component="div">
          <strong>Gemini Free Plan</strong> 사용 중 — 분당 15회 요청 / 일
          1,500회 / 분당 100만 토큰 제한이 적용됩니다. 응답이 느리거나 실패할 수
          있어요.
        </Typography>
      </Alert>

      <Stack direction="row" justifyContent="flex-end" mb={1}>
        {messages.length > 0 && (
          <Tooltip title="대화 초기화">
            <IconButton size="small" onClick={clearMessages}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      <ChatMessageList messages={messages} isPending={isPending} />

      <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
        <ChatInput onSend={sendMessage} disabled={isPending} />
      </Box>
    </Stack>
  );
};

export default PrivacyLawChatPage;
