import { httpClient } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
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
  return await httpClient.get<HttpResponseType<DailyTodoDashboardType>>(
    `/dashboard/daily-todos?period=${period}&date=${date}`,
    { signal },
  );
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
  return await httpClient.get<HttpResponseType<NoteDashboardType>>(
    `/dashboard/notes?period=${period}&date=${date}`,
    { signal },
  );
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
  return await httpClient.get<HttpResponseType<MessageDashboardType>>(
    `/dashboard/future-messages?period=${period}&date=${date}`,
    { signal },
  );
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
  return await httpClient.get<HttpResponseType<NotificationDashboardType>>(
    `/dashboard/notifications?period=${period}&date=${date}`,
    { signal },
  );
};

export const fetchSystemDashboard = async (
  { period }: { period: SystemPeriodType },
  signal?: AbortSignal,
) => {
  return await httpClient.get<HttpResponseType<SystemDashboardType>>(
    `/dashboard/system?period=${period}`,
    { signal },
  );
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
  return await httpClient.get<HttpResponseType<ActivityDashboardType>>(
    `/dashboard/activity?period=${period}&date=${date}`,
    { signal },
  );
};

export const fetchProjectIssueDashboard = async (
  { projectId }: { projectId: string },
  signal?: AbortSignal,
) => {
  return await httpClient.get<HttpResponseType<ProjectIssueDashboardDto>>(
    `/dashboard/projects/${projectId}/issues`,
    { signal },
  );
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
  return await httpClient.get<HttpResponseType<SprintDashboardDto>>(
    `/dashboard/projects/${projectId}/sprints/${sprintId}`,
    { signal },
  );
};
