import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { Bom } from "@/packages/bom";
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
            pages: Bom.pipe(
              prev.pages,
              Bom.map((page) => ({
                ...page,
                data: Bom.pipe(
                  page.data,
                  Bom.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
                ),
              })),
            ),
          };
        },
      );
    },
  });
};
