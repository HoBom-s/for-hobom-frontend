import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import {
  fetchDailyTodoDashboard,
  fetchNoteDashboard,
  fetchMessageDashboard,
  fetchNotificationDashboard,
  fetchSystemDashboard,
  fetchActivityDashboard,
  fetchProjectIssueDashboard,
  fetchSprintDashboard,
} from "./dashboard.api";
import type { PeriodType, SystemPeriodType } from "./dashboard.type";

export const dashboardQueries = {
  all: () => ["dashboard"],

  dailyTodos: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "daily-todos", period, date],
      queryFn: ({ signal }) => fetchDailyTodoDashboard({ period, date }, signal),
    }),

  notes: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "notes", period, date],
      queryFn: ({ signal }) => fetchNoteDashboard({ period, date }, signal),
    }),

  messages: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "messages", period, date],
      queryFn: ({ signal }) => fetchMessageDashboard({ period, date }, signal),
    }),

  notifications: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "notifications", period, date],
      queryFn: ({ signal }) => fetchNotificationDashboard({ period, date }, signal),
    }),

  system: (period: SystemPeriodType) =>
    queryOptions({
      queryKey: ["dashboard", "system", period],
      queryFn: ({ signal }) => fetchSystemDashboard({ period }, signal),
    }),

  activity: (period: PeriodType, date: string) =>
    queryOptions({
      queryKey: ["dashboard", "activity", period, date],
      queryFn: ({ signal }) => fetchActivityDashboard({ period, date }, signal),
    }),

  projectIssues: (projectId: string) =>
    queryOptions({
      queryKey: ["dashboard", "project-issues", projectId],
      queryFn: ({ signal }) => fetchProjectIssueDashboard({ projectId }, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),

  sprint: (projectId: string, sprintId: string) =>
    queryOptions({
      queryKey: ["dashboard", "sprint", projectId, sprintId],
      queryFn: ({ signal }) => fetchSprintDashboard({ projectId, sprintId }, signal),
      ...CACHE_PROFILE.DASHBOARD,
    }),
} as const;
