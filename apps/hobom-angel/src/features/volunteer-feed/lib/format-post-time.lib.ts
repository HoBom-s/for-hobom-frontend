import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

/** Relative post time, e.g. "3시간 전". Empty for a missing timestamp. */
export const formatPostTime = (iso: string | null): string => {
  if (!iso) return "";

  return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ko });
};
