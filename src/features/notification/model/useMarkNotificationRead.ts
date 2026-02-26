import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { HttpResponseType } from "@/shared/api";
import {
  notificationQueries,
  notificationMutations,
  patchNotificationRead,
  type NotificationItemType,
} from "@/entities/notification";

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...notificationMutations.read(),
    mutationFn: patchNotificationRead,
    onSuccess: (_, id) => {
      queryClient.setQueryData<HttpResponseType<NotificationItemType[]>>(
        notificationQueries.all(),
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            items: prev.items.map((n) =>
              n.id === id ? { ...n, isRead: true } : n,
            ),
          };
        },
      );
    },
  });
};
