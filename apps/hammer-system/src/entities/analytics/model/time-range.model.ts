import type { TimeRange, DateRangeParams } from "../api/analytics.type";

export const TIME_RANGE_LABEL: Record<TimeRange, string> = {
  LAST_1H: "1시간",
  LAST_6H: "6시간",
  LAST_24H: "24시간",
  LAST_7D: "7일",
};

export const DEFAULT_TIME_RANGE: TimeRange = "LAST_24H";

const HOURS: Record<TimeRange, number> = {
  LAST_1H: 1,
  LAST_6H: 6,
  LAST_24H: 24,
  LAST_7D: 168,
};

export const toDateRange = (range: TimeRange): DateRangeParams => {
  const now = new Date();
  const from = new Date(now.getTime() - HOURS[range] * 3_600_000);

  return { from: from.toISOString(), to: now.toISOString() };
};
