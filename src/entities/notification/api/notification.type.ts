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
