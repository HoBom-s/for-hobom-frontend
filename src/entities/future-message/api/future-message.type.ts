import type { FutureMessageSendStatusType } from "../model/future-message-send-status.model";

export interface FutureMessageType {
  id: string;
  title: string;
  content: string;
  scheduledAt: string;
  sendStatus: FutureMessageSendStatusType;
  createdAt: string;
  updatedAt: string;
}
