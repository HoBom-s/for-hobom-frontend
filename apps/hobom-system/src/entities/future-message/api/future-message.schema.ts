import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { FutureMessageType } from "./future-message.type";

export const futureMessageSchema: Schema<FutureMessageType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  content: HoBomSchema.string(),
  scheduledAt: HoBomSchema.date(),
  sendStatus: HoBomSchema.enum(["PENDING", "SENT"]),
  createdAt: HoBomSchema.date(),
  updatedAt: HoBomSchema.date(),
});

export const futureMessagesSchema: Schema<FutureMessageType[]> =
  HoBomSchema.array(futureMessageSchema);
