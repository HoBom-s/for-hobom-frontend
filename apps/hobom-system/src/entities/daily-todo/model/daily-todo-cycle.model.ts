export const DailyTodoCycleModel = {
  EVERYDAY: "EVERYDAY",
  EVERY_WEEKDAY: "EVERY_WEEKDAY",
  EVERY_WEEKEND: "EVERY_WEEKEND",
} as const;

export const CYCLE_LABELS: Record<keyof typeof DailyTodoCycleModel, string> = {
  EVERYDAY: "매일",
  EVERY_WEEKDAY: "주중",
  EVERY_WEEKEND: "주말",
};
