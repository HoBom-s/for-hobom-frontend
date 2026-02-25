import { queryOptions } from "@tanstack/react-query";
import type { FutureMessageSendStatusType } from "@/entities/future-message/model/future-message-send-status.model";
import { fetchFutureMessageByStatus } from "@/entities/future-message/api/future-message.api";

export const futureMessageQueries = {
  futureMessages: () => ["future-messages"],

  byStatus: ({ status }: { status: FutureMessageSendStatusType }) =>
    queryOptions({
      queryKey: ["future-messages", "status", status],
      queryFn: () => fetchFutureMessageByStatus({ status }),
    }),
} as const;
