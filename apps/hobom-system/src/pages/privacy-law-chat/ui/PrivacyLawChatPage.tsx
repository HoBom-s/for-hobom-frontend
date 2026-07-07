import { DeleteOutline } from "hobom-design-system/icons";
import { useChatSession, ChatMessageList, ChatInput } from "@/features/privacy-law-chat";
import { Hb } from "@/shared/ui";

const PrivacyLawChatPage = () => {
  const { messages, sendMessage, clearMessages, isPending } = useChatSession();

  return (
    <Hb.Stack sx={{ height: "calc(100vh - 240px)", minHeight: 400 }}>
      <Hb.Alert severity="info" variant="outlined" sx={{ mb: 1.5 }}>
        <Hb.Text variant="caption" component="div">
          <strong>Gemini Free Plan</strong> 사용 중 — 분당 15회 요청 / 일 1,500회 / 분당 100만 토큰
          제한이 적용됩니다. 응답이 느리거나 실패할 수 있어요.
        </Hb.Text>
      </Hb.Alert>
      <Hb.Stack direction="row" justifyContent="flex-end" mb={1}>
        {messages.length > 0 && (
          <Hb.Tooltip title="대화 초기화">
            <Hb.Button.Icon size="small" onClick={clearMessages}>
              <DeleteOutline fontSize="small" />
            </Hb.Button.Icon>
          </Hb.Tooltip>
        )}
      </Hb.Stack>
      <ChatMessageList messages={messages} isPending={isPending} />
      <Hb.Box
        style={{
          paddingTop: 16,
          borderTop: 1,
          borderColor: "var(--hb-color-border)",
        }}
      >
        <ChatInput onSend={sendMessage} disabled={isPending} />
      </Hb.Box>
    </Hb.Stack>
  );
};

export default PrivacyLawChatPage;
