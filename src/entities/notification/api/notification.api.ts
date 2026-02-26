import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type { NotificationItemType } from "./notification.type";

export const fetchNotifications = async () => {
  return await httpClient.get<HttpResponseType<NotificationItemType[]>>(
    "/notifications",
  );
};

export const patchNotificationRead = async (id: string) => {
  return await httpClient.patch<void>(`/notifications/${id}/read`, {});
};
