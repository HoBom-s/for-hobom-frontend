import type { FutureMessageSendStatusType } from "@/entities/future-message/model/future-message-send-status.model.ts";
import { httpClient, type HttpResponseType } from "@/shared/api";
import type { FutureMessageType } from "@/entities/future-message/api/future-message.type.ts";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";

export const fetchFutureMessageByStatus = async ({
  status,
}: {
  status: FutureMessageSendStatusType;
}) =>
  httpClient.get<HttpResponseType<FutureMessageType[]>>(
    `/future-messages/by-status?status=${status}`,
  );

export const postFutureMessage = async (body: FutureMessageSendSchemaType) =>
  httpClient.post("/future-messages", body);
