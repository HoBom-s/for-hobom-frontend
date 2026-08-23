import type { MessageSenderRole } from "../model/conversation.model";

/** `GET /conversations/:subjectType/:subjectRef/messages` item. */
export interface RawMessage {
  id: string;
  senderId: string;
  senderRole: MessageSenderRole;
  body: string;
  sentAt: string | null;
}

/** `POST /conversations/:subjectType/:subjectRef/messages` response. */
export interface PostMessageResult {
  messageId: string;
}
