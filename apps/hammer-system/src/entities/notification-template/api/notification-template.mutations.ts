import { mutationOptions } from "hobom-data";
import {
  postCreateNotificationTemplate,
  putUpdateNotificationTemplate,
  deleteNotificationTemplate,
} from "./notification-template.api";

export const notificationTemplateMutations = {
  all: () => ["notification-templates"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...notificationTemplateMutations.all(), "create"] as const,
      mutationFn: postCreateNotificationTemplate,
    }),

  update: () =>
    mutationOptions({
      mutationKey: [...notificationTemplateMutations.all(), "update"] as const,
      mutationFn: putUpdateNotificationTemplate,
    }),

  delete: () =>
    mutationOptions({
      mutationKey: [...notificationTemplateMutations.all(), "delete"] as const,
      mutationFn: deleteNotificationTemplate,
    }),
} as const;
