import { useCallback, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privacyLawMutations, privacyLawQueries } from "@/entities/privacy-law";
import type { QuestionHistory } from "@/entities/privacy-law";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  referencedArticles?: string[];
  timestamp: Date;
}

const historyToMessages = (history: QuestionHistory[]): ChatMessage[] =>
  history.flatMap((h) => [
    {
      id: `history-q-${h.id}`,
      role: "user" as const,
      content: h.question,
      timestamp: new Date(h.createdAt),
    },
    {
      id: `history-a-${h.id}`,
      role: "assistant" as const,
      content: h.answer,
      referencedArticles: h.referencedArticles,
      timestamp: new Date(h.createdAt),
    },
  ]);

export const useChatSession = () => {
  const queryClient = useQueryClient();
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const idCounter = useRef(0);

  const { data: historyData } = useQuery(privacyLawQueries.questionHistory());
  const historyMessages = historyData
    ? historyToMessages(historyData.items)
    : [];

  const messages = [...historyMessages, ...localMessages];

  const mutation = useMutation(privacyLawMutations.ask());

  const sendMessage = useCallback(
    (question: string) => {
      const userMsg: ChatMessage = {
        id: `msg-${++idCounter.current}`,
        role: "user",
        content: question,
        timestamp: new Date(),
      };

      setLocalMessages((prev) => [...prev, userMsg]);

      mutation.mutate(
        { question },
        {
          onSuccess: (data) => {
            const { answer, referencedArticles } = data.items;
            const assistantMsg: ChatMessage = {
              id: `msg-${++idCounter.current}`,
              role: "assistant",
              content: answer,
              referencedArticles,
              timestamp: new Date(),
            };

            setLocalMessages((prev) => [...prev, assistantMsg]);
            queryClient.invalidateQueries({
              queryKey: privacyLawQueries.questionHistory().queryKey,
            });
          },
        },
      );
    },
    [mutation, queryClient],
  );

  const clearMessages = useCallback(() => setLocalMessages([]), []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isPending: mutation.isPending,
  };
};
