import { queryOptions } from "@tanstack/react-query";
import type { FutureMessageSendStatusType } from "@/entities/future-message/model/future-message-send-status.model.ts";
import { fetchFutureMessageByStatus } from "@/entities/future-message/api/future-message.api.ts";

export const fetchFutureMessagesBySendStatusOptions = ({
  status,
}: {
  status: FutureMessageSendStatusType;
}) =>
  queryOptions({
    queryKey: ["future-message", "status", status],
    queryFn: () => fetchFutureMessageByStatus({ status }),
  });
