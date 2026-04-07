import { supportHttpClient } from "@/shared/api";
import type {
  NotificationTemplateType,
  CreateNotificationTemplateRequest,
  UpdateNotificationTemplateRequest,
} from "./notification-template.type";

export const fetchNotificationTemplates = () =>
  supportHttpClient.get<NotificationTemplateType[]>("/api/notification-templates");

export const fetchNotificationTemplate = (id: string) =>
  supportHttpClient.get<NotificationTemplateType>(`/api/notification-templates/${id}`);

export const postCreateNotificationTemplate = (data: CreateNotificationTemplateRequest) =>
  supportHttpClient.post<NotificationTemplateType>("/api/notification-templates", data);

export const putUpdateNotificationTemplate = ({
  id,
  ...data
}: UpdateNotificationTemplateRequest & { id: string }) =>
  supportHttpClient.put<NotificationTemplateType>(`/api/notification-templates/${id}`, data);

export const deleteNotificationTemplate = (id: string) =>
  supportHttpClient.delete<void>(`/api/notification-templates/${id}`);
