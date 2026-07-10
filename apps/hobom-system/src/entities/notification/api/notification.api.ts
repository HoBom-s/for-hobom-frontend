import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type { NotificationPageParams, NotificationPageResponse } from "./notification.type";

const DEFAULT_PAGE_SIZE = 10;

export const fetchNotificationPage = async (
  params: NotificationPageParams = {},
  signal?: AbortSignal,
) => {
  const searchParams = new URLSearchParams();

  if (params.cursor) searchParams.set("cursor", params.cursor);
  searchParams.set("size", String(params.size ?? DEFAULT_PAGE_SIZE));

  const qs = searchParams.toString();
  const res = await httpClient.get<HttpResponseType<NotificationPageResponse>>(
    `/notifications/scroll?${qs}`,
    { signal },
  );

  return res.items;
};

export const patchNotificationRead = async (id: string) => {
  return await httpClient.patch<void>(`/notifications/${id}/read`, {});
};
