import { startOfDay, subDays } from "date-fns";
import { Bom } from "hobom-utils";
import type { NotificationItemType } from "../api/notification.type";

interface DateGroup {
  label: string;
  items: NotificationItemType[];
}

const DATE_LABELS = ["오늘", "어제", "이번 주", "이전"] as const;

type DateLabel = (typeof DATE_LABELS)[number];

const classifyDate = (
  createdAt: string,
  today: Date,
  yesterday: Date,
  weekAgo: Date,
): DateLabel => {
  const d = new Date(createdAt);

  if (d >= today) return "오늘";
  if (d >= yesterday) return "어제";
  if (d >= weekAgo) return "이번 주";

  return "이전";
};

export const groupNotificationsByDate = (
  items: NotificationItemType[],
  now = new Date(),
): DateGroup[] => {
  const today = startOfDay(now);
  const yesterday = subDays(today, 1);
  const weekAgo = subDays(today, 7);

  const grouped = Bom.groupBy(items, (item) =>
    classifyDate(item.createdAt, today, yesterday, weekAgo),
  );

  return Bom.pipe(
    [...DATE_LABELS],
    Bom.filter((label) => (grouped[label]?.length ?? 0) > 0),
    Bom.map((label) => ({ label, items: grouped[label] ?? [] })),
  );
};
