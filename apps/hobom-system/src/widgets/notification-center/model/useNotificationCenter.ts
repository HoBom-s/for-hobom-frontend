import { useMemo, useState } from "react";
import { groupNotificationsByDate, type NotificationItemType } from "@/entities/notification";
import { useNotificationList, useMarkNotificationRead, TAB_FILTERS } from "@/features/notification";
import { useInfiniteScroll } from "@/shared/model";

export const useNotificationCenter = () => {
  const [tab, setTab] = useState(0);
  const filter = TAB_FILTERS[tab];
  const { notifications, unreadCount, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useNotificationList(filter);
  const markRead = useMarkNotificationRead();

  const dateGroups = useMemo(() => groupNotificationsByDate(notifications), [notifications]);

  const handleScroll = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleMarkRead = (n: NotificationItemType) => {
    if (!n.isRead) {
      markRead.mutate(n.id);
    }
  };

  return {
    tab,
    setTab,
    filter,
    dateGroups,
    unreadCount,
    isPending,
    isFetchingNextPage,
    handleScroll,
    handleMarkRead,
  };
};
