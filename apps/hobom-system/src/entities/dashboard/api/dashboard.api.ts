import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import {
  dailyTodoDashboardSchema,
  noteDashboardSchema,
  messageDashboardSchema,
  notificationDashboardSchema,
  systemDashboardSchema,
  activityDashboardSchema,
  projectIssueDashboardSchema,
  sprintDashboardSchema,
} from "./dashboard.schema";
import type {
  PeriodType,
  SystemPeriodType,
  DailyTodoDashboardType,
  NoteDashboardType,
  MessageDashboardType,
  NotificationDashboardType,
  SystemDashboardType,
  ActivityDashboardType,
  ProjectIssueDashboardDto,
  SprintDashboardDto,
} from "./dashboard.type";

export const fetchDailyTodoDashboard = async (
  {
    period,
    date,
  }: {
    period: PeriodType;
    date: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<DailyTodoDashboardType>>(
    `/dashboard/daily-todos?period=${period}&date=${date}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(dailyTodoDashboardSchema, "GET /dashboard/daily-todos")(res.items),
  };
};

export const fetchNoteDashboard = async (
  {
    period,
    date,
  }: {
    period: PeriodType;
    date: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<NoteDashboardType>>(
    `/dashboard/notes?period=${period}&date=${date}`,
    { signal },
  );

  return { ...res, items: parseResponse(noteDashboardSchema, "GET /dashboard/notes")(res.items) };
};

export const fetchMessageDashboard = async (
  {
    period,
    date,
  }: {
    period: PeriodType;
    date: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<MessageDashboardType>>(
    `/dashboard/future-messages?period=${period}&date=${date}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(messageDashboardSchema, "GET /dashboard/future-messages")(res.items),
  };
};

export const fetchNotificationDashboard = async (
  {
    period,
    date,
  }: {
    period: PeriodType;
    date: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<NotificationDashboardType>>(
    `/dashboard/notifications?period=${period}&date=${date}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(notificationDashboardSchema, "GET /dashboard/notifications")(res.items),
  };
};

export const fetchSystemDashboard = async (
  { period }: { period: SystemPeriodType },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<SystemDashboardType>>(
    `/dashboard/system?period=${period}`,
    { signal },
  );

  return { ...res, items: parseResponse(systemDashboardSchema, "GET /dashboard/system")(res.items) };
};

export const fetchActivityDashboard = async (
  {
    period,
    date,
  }: {
    period: PeriodType;
    date: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<ActivityDashboardType>>(
    `/dashboard/activity?period=${period}&date=${date}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(activityDashboardSchema, "GET /dashboard/activity")(res.items),
  };
};

export const fetchProjectIssueDashboard = async (
  { projectId }: { projectId: string },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<ProjectIssueDashboardDto>>(
    `/dashboard/projects/${projectId}/issues`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(projectIssueDashboardSchema, "GET /dashboard/projects/:id/issues")(
      res.items,
    ),
  };
};

export const fetchSprintDashboard = async (
  {
    projectId,
    sprintId,
  }: {
    projectId: string;
    sprintId: string;
  },
  signal?: AbortSignal,
) => {
  const res = await httpClient.get<HttpResponseType<SprintDashboardDto>>(
    `/dashboard/projects/${projectId}/sprints/${sprintId}`,
    { signal },
  );

  return {
    ...res,
    items: parseResponse(sprintDashboardSchema, "GET /dashboard/projects/:id/sprints/:id")(
      res.items,
    ),
  };
};
