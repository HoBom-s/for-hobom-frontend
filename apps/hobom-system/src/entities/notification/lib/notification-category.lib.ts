import type { NotificationCategory } from "../api/notification.type";

interface CategoryMeta {
  label: string;
  color: string;
  bgColor: string;
}

export const NOTIFICATION_CATEGORY: Record<NotificationCategory, CategoryMeta> = {
  SYSTEM: { label: "시스템", color: "#4680ff", bgColor: "#eef3ff" },
};
