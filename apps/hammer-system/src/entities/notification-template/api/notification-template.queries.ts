import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchNotificationTemplates } from "./notification-template.api";

export const notificationTemplateQueries = {
  all: () => ["notification-templates"],

  list: () =>
    queryOptions({
      queryKey: ["notification-templates", "list"],
      queryFn: fetchNotificationTemplates,
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
