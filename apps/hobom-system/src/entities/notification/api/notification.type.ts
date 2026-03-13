export type NotificationCategory = "SYSTEM";

export interface NotificationItemType {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  senderId: string;
  isRead: boolean;
  createdAt: string;
}

export type ReadFilter = "all" | "unread" | "read";

export interface NotificationPageParams {
  cursor?: string;
  size?: number;
}

export interface NotificationPageResponse {
  data: NotificationItemType[];
  nextCursor: string | null;
  hasNext: boolean;
}
