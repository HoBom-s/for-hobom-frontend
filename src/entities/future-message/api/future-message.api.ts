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
    `/api/future-messages/by-status?status=${status}`,
  );

export const postFutureMessage = async (body: FutureMessageSendSchemaType) =>
  httpClient.post("/api/future-messages", body);

export const patchFutureMessage = async ({
  id,
  ...body
}: {
  id: string;
  title?: string;
  content?: string;
  scheduledAt?: string;
}) => httpClient.patch(`/api/future-messages/${id}`, body);

export const deleteFutureMessage = async ({ id }: { id: string }) =>
  httpClient.delete(`/api/future-messages/${id}`);
