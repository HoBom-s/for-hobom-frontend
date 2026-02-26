import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
} from "date-fns";
import { ko } from "date-fns/locale";

export const formatRelativeTime = (
  dateString: string,
  now = new Date(),
): string => {
  const target = new Date(dateString);
  const diffMin = differenceInMinutes(now, target);
  const diffHour = differenceInHours(now, target);
  const diffDay = differenceInDays(now, target);

  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;

  return format(target, "M월 d일", { locale: ko });
};
