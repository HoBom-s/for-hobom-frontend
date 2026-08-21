import { queryOptions } from "hobom-data";
import { getMessages } from "./conversation.api";
import type { MessageSubjectType } from "../model/conversation.model";

export const conversationQueries = {
  all: () => ["conversations"] as const,

  thread: (subjectType: MessageSubjectType, subjectRef: string) =>
    queryOptions({
      queryKey: [...conversationQueries.all(), subjectType, subjectRef] as const,
      queryFn: ({ signal }) => getMessages(subjectType, subjectRef, signal),
    }),
} as const;
