import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { NotificationItemType, NotificationPageResponse } from "./notification.type";

export const notificationItemSchema: Schema<NotificationItemType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  category: HoBomSchema.enum(["SYSTEM"]),
  title: HoBomSchema.string(),
  body: HoBomSchema.string(),
  senderId: HoBomSchema.string(),
  isRead: HoBomSchema.boolean(),
  createdAt: HoBomSchema.date(),
});

export const notificationPageSchema: Schema<NotificationPageResponse> = HoBomSchema.object({
  data: HoBomSchema.array(notificationItemSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});
