import { httpClient, type HttpResponseType } from "@/shared/api";
import type { FutureMessageSendStatusType } from "../model/future-message-send-status.model";
import type { FutureMessageType } from "./future-message.type";
import type { FutureMessageSendSchemaType } from "../model/future-message-send.model";

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

export const patchFutureMessage = async ({
  id,
  ...body
}: {
  id: string;
  title?: string;
  content?: string;
  scheduledAt?: string;
}) => httpClient.patch(`/future-messages/${id}`, body);

export const deleteFutureMessage = async ({ id }: { id: string }) =>
  httpClient.delete(`/future-messages/${id}`);
