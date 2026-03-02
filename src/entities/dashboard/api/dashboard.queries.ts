import { queryOptions } from "@tanstack/react-query";
import {
  fetchDailyTodoDashboard,
  fetchNoteDashboard,
  fetchMessageDashboard,
  fetchNotificationDashboard,
  fetchSystemDashboard,
  fetchActivityDashboard,
} from "./dashboard.api";
import type { PeriodType, SystemPeriodType } from "./dashboard.type";

export const dashboardQueries = {
  all: () => ["dashboard"],

  dailyTodos: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "daily-todos", period, date],
      queryFn: () => fetchDailyTodoDashboard({ period, date }),
    }),

  notes: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "notes", period, date],
      queryFn: () => fetchNoteDashboard({ period, date }),
    }),

  messages: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "messages", period, date],
      queryFn: () => fetchMessageDashboard({ period, date }),
    }),

  notifications: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "notifications", period, date],
      queryFn: () => fetchNotificationDashboard({ period, date }),
    }),

  system: (period: SystemPeriodType) =>
    queryOptions({
      queryKey: ["dashboard", "system", period],
      queryFn: () => fetchSystemDashboard({ period }),
    }),

  activity: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "activity", period, date],
      queryFn: () => fetchActivityDashboard({ period, date }),
    }),
} as const;
