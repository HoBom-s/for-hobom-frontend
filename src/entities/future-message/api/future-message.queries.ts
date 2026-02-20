import { queryOptions } from "@tanstack/react-query";
import type { FutureMessageSendStatusType } from "@/entities/future-message/model/future-message-send-status.model.ts";
import { fetchFutureMessageByStatus } from "@/entities/future-message/api/future-message.api.ts";

export const FUTURE_MESSAGE_STATUS_QUERY_KEY = [
  "future-message",
  "status",
] as const;

export const fetchFutureMessagesBySendStatusOptions = ({
  status,
}: {
  status: FutureMessageSendStatusType;
}) =>
  queryOptions({
    queryKey: [...FUTURE_MESSAGE_STATUS_QUERY_KEY, status],
    queryFn: () => fetchFutureMessageByStatus({ status }),
  });
