import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bom } from "@/packages/bom";
import { notificationQueries, type ReadFilter } from "@/entities/notification";
import { FILTER_PREDICATES } from "../lib/notification-filter.lib";

export const useNotificationList = (filter: ReadFilter = "all") => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery(notificationQueries.pages());

  const allItems = useMemo(
    () => Bom.pipe(data?.pages ?? [], Bom.flatMap(Bom.prop("data"))),
    [data?.pages],
  );

  const unreadCount = useMemo(
    () => Bom.pipe(allItems, Bom.filter(FILTER_PREDICATES.unread)).length,
    [allItems],
  );

  const notifications = useMemo(
    () => Bom.pipe(allItems, Bom.filter(FILTER_PREDICATES[filter])),
    [allItems, filter],
  );

  return {
    notifications,
    unreadCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  };
};
