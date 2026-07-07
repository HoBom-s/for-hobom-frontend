import { useEffect, useRef } from "react";
import { GavelOutlined, PersonOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { ReferencedArticles } from "./ReferencedArticles";
import type { ChatMessage } from "../model/useChatSession";

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
      <Hb.Stack
        style={{
          flex: 1,
          paddingTop: 64,
          paddingBottom: 64,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GavelOutlined sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
        <Hb.Text variant="h6" color="text.secondary" gutterBottom>
          개인정보보호법 AI 상담
        </Hb.Text>
        <Hb.Text variant="body2" color="text.disabled">
          개인정보보호법에 대해 질문해보세요. 관련 조문을 참조하여 답변합니다.
        </Hb.Text>
      </Hb.Stack>
    );
  }

  return (
    <Hb.Stack
      spacing={2}
      style={{
        flex: 1,
        overflow: "auto",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      {messages.map((msg) => (
        <Hb.Stack
          key={msg.id}
          direction="row"
          spacing={1.5}
          style={{
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            alignItems: "flex-start",
          }}
        >
          <Hb.Avatar
            style={{
              width: 32,
              height: 32,
              backgroundColor: msg.role === "user" ? "primary.main" : "grey.700",
            }}
          >
            {msg.role === "user" ? (
              <PersonOutlined fontSize="small" />
            ) : (
              <GavelOutlined fontSize="small" />
            )}
          </Hb.Avatar>
          <Hb.Paper
            elevation={0}
            style={{
              padding: 16,
              maxWidth: "70%",
              backgroundColor: msg.role === "user" ? "#eef3ff" : "var(--hb-color-surface)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: msg.role === "user" ? "#94baff" : "var(--hb-color-border)",
              borderRadius: 16,
            }}
          >
            <Hb.Text
              variant="body2"
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {msg.content}
            </Hb.Text>
            {msg.referencedArticles && msg.referencedArticles.length > 0 && (
              <ReferencedArticles articles={msg.referencedArticles} />
            )}
          </Hb.Paper>
        </Hb.Stack>
      ))}
      {isPending && (
        <Hb.Stack
          direction="row"
          spacing={1.5}
          style={{
            alignItems: "flex-start",
          }}
        >
          <Hb.Avatar style={{ width: 32, height: 32, backgroundColor: "#616161" }}>
            <GavelOutlined fontSize="small" />
          </Hb.Avatar>
          <Hb.Paper
            elevation={0}
            style={{
              padding: 16,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "var(--hb-color-border)",
              borderRadius: 16,
            }}
          >
            <Hb.Stack
              direction="row"
              spacing={1}
              style={{
                alignItems: "center",
              }}
            >
              <Hb.Progress.Circular size={16} />
              <Hb.Text variant="body2" color="text.secondary">
                답변 생성 중...
              </Hb.Text>
            </Hb.Stack>
          </Hb.Paper>
        </Hb.Stack>
      )}
      <div ref={bottomRef} />
    </Hb.Stack>
  );
};
