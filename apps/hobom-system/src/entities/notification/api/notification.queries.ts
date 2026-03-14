import { infiniteQueryOptions } from "hobom-data";
import { fetchNotificationPage } from "./notification.api";

export const notificationQueries = {
  all: () => ["notifications"] as const,

  pages: () =>
    infiniteQueryOptions({
      queryKey: [...notificationQueries.all(), "scroll"] as const,
      queryFn: ({ pageParam }) => fetchNotificationPage({ cursor: pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
      refetchInterval: 10_000,
    }),
};

export const notificationMutations = {
  read: () => ({ mutationKey: ["notifications", "read"] as const }),
};
