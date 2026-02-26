import { queryOptions } from "@tanstack/react-query";
import { fetchNotifications } from "./notification.api";

export const notificationQueries = {
  all: () => ["notifications"] as const,

  list: () =>
    queryOptions({
      queryKey: notificationQueries.all(),
      queryFn: fetchNotifications,
      refetchInterval: 10_000,
    }),
};

export const notificationMutations = {
  read: () => ({ mutationKey: ["notifications", "read"] as const }),
};
