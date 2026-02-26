import type { ReadFilter } from "../model/useNotificationList";

export const TAB_FILTERS: ReadFilter[] = ["all", "unread", "read"];

export const EMPTY_MESSAGES: Record<ReadFilter, string> = {
  all: "알림이 없어요.",
  unread: "읽지 않은 알림이 없어요.",
  read: "읽은 알림이 없어요.",
};
