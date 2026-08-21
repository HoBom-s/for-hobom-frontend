import { useState } from "react";
import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { conversationMutations, conversationQueries } from "@/entities/conversation";
import { useToast } from "@/shared/model";

/** Drives one inquiry's message thread: the loaded messages plus a draft the
 *  viewer (the applicant) can send. Posting refreshes the thread in place. */
export const useInquiryThread = (inquiryId: string) => {
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();
  const [draft, setDraft] = useState("");

  const { data: messages } = useSuspenseQuery(conversationQueries.thread("INQUIRY", inquiryId));

  const mutation = useMutation({
    ...conversationMutations.post(),
    onSuccess: () => {
      setDraft("");
      void dataLot.invalidateQueries({
        queryKey: conversationQueries.thread("INQUIRY", inquiryId).queryKey,
      });
    },
    onError: (error: Error) =>
      openErrorToast({ message: error.message || "메시지 전송에 실패했어요." }),
  });

  const send = () => {
    const body = draft.trim();

    if (!body || mutation.isPending) return;

    mutation.mutate({ subjectType: "INQUIRY", subjectRef: inquiryId, body });
  };

  return { messages, draft, setDraft, send, sending: mutation.isPending };
};
