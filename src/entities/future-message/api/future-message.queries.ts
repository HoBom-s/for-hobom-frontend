import { queryOptions } from "@tanstack/react-query";
import type { FutureMessageSendStatusType } from "../model/future-message-send-status.model";
import { fetchFutureMessageByStatus } from "./future-message.api";

export const futureMessageQueries = {
  futureMessages: () => ["future-messages"],

  byStatus: ({ status }: { status: FutureMessageSendStatusType }) =>
    queryOptions({
      queryKey: ["future-messages", "status", status],
      queryFn: () => fetchFutureMessageByStatus({ status }),
    }),
} as const;
