import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationQueries, type ReadFilter } from "@/entities/notification";

export const useNotificationList = (filter: ReadFilter = "all") => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery(notificationQueries.pages());

  const allItems = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages],
  );

  const unreadCount = useMemo(
    () => allItems.filter((n) => !n.isRead).length,
    [allItems],
  );

  const notifications = useMemo(() => {
    if (filter === "unread") return allItems.filter((n) => !n.isRead);
    if (filter === "read") return allItems.filter((n) => n.isRead);
    return allItems;
  }, [allItems, filter]);

  return {
    notifications,
    unreadCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  };
};
