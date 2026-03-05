import type { PeriodType, SystemPeriodType } from "../api/dashboard.type";

export const PeriodModel = {
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
} as const satisfies Record<string, PeriodType>;

export const SystemPeriodModel = {
  LAST_24H: "LAST_24H",
  LAST_7D: "LAST_7D",
  LAST_30D: "LAST_30D",
} as const satisfies Record<string, SystemPeriodType>;

export const PERIOD_LABEL: Record<PeriodType, string> = {
  WEEKLY: "주간",
  MONTHLY: "월간",
};

export const SYSTEM_PERIOD_LABEL: Record<SystemPeriodType, string> = {
  LAST_24H: "24시간",
  LAST_7D: "7일",
  LAST_30D: "30일",
};

export const SYSTEM_PERIOD_HOURS: Record<SystemPeriodType, number> = {
  LAST_24H: 24,
  LAST_7D: 168,
  LAST_30D: 168, // API max 168h
};
