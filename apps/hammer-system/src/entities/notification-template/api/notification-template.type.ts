export type NotificationChannel = "Push" | "InApp" | "Both";

export interface NotificationTemplateType {
  id: string;
  templateKey: string;
  titleTemplate: string;
  bodyTemplate: string;
  channel: NotificationChannel;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationTemplateRequest {
  templateKey: string;
  titleTemplate: string;
  bodyTemplate: string;
  channel: NotificationChannel;
}

export type UpdateNotificationTemplateRequest = CreateNotificationTemplateRequest;
