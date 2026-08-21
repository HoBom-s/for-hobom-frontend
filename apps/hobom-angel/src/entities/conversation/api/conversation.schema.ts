import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { PostMessageResult, RawMessage } from "./conversation.type";

const SENDER_ROLE = ["APPLICANT", "SHELTER"] as const;

/** `GET /conversations/:subjectType/:subjectRef/messages` — the thread. */
export const messagesSchema: Schema<RawMessage[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    senderId: HoBomSchema.string(),
    senderRole: HoBomSchema.enum(SENDER_ROLE),
    body: HoBomSchema.string(),
    sentAt: HoBomSchema.string().nullable(),
  }),
);

/** `POST /conversations/:subjectType/:subjectRef/messages` — the new message id. */
export const postMessageResultSchema: Schema<PostMessageResult> = HoBomSchema.object({
  messageId: HoBomSchema.string(),
});
