import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/entities/notification";

export type ReadFilter = "all" | "unread" | "read";

export const useNotificationList = (filter: ReadFilter = "all") => {
  const { data } = useQuery(notificationQueries.list());

  return useMemo(() => {
    const items = data?.items ?? [];
    const unreadCount = items.filter((n) => !n.isRead).length;

    if (filter === "unread")
      return { notifications: items.filter((n) => !n.isRead), unreadCount };
    if (filter === "read")
      return { notifications: items.filter((n) => n.isRead), unreadCount };

    return { notifications: items, unreadCount };
  }, [data?.items, filter]);
};
