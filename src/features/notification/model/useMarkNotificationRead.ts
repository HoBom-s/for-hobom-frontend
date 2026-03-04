import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  notificationQueries,
  notificationMutations,
  patchNotificationRead,
  type NotificationPageResponse,
} from "@/entities/notification";

type PageData = InfiniteData<NotificationPageResponse, string | undefined>;

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...notificationMutations.read(),
    mutationFn: patchNotificationRead,
    onSuccess: (_, id) => {
      queryClient.setQueryData<PageData>(
        notificationQueries.pages().queryKey,
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              data: page.data.map((n) =>
                n.id === id ? { ...n, isRead: true } : n,
              ),
            })),
          };
        },
      );
    },
  });
};
