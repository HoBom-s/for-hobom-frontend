import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchFutureMessageByStatus } from "./future-message.api";
import type { FutureMessageSendStatusType } from "../model/future-message-send-status.model";

export const futureMessageQueries = {
  futureMessages: () => ["future-messages"],

  byStatus: ({ status }: { status: FutureMessageSendStatusType }) =>
    queryOptions({
      queryKey: ["future-messages", "status", status],
      queryFn: ({ signal }) => fetchFutureMessageByStatus({ status }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
