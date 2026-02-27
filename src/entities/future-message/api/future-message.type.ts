import type { FutureMessageSendStatusType } from "@/entities/future-message/model/future-message-send-status.model.ts";

export interface FutureMessageType {
  id: string;
  title: string;
  content: string;
  scheduledAt: string;
  sendStatus: FutureMessageSendStatusType;
  createdAt: string;
  updatedAt: string;
}
