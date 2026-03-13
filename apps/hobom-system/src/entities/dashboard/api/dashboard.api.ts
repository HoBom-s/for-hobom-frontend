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

export const fetchDailyTodoDashboard = async ({
  period,
  date,
}: {
  period: PeriodType;
  date: string;
}) => {
  return await httpClient.get<HttpResponseType<DailyTodoDashboardType>>(
    `/dashboard/daily-todos?period=${period}&date=${date}`,
  );
};

export const fetchNoteDashboard = async ({
  period,
  date,
}: {
  period: PeriodType;
  date: string;
}) => {
  return await httpClient.get<HttpResponseType<NoteDashboardType>>(
    `/dashboard/notes?period=${period}&date=${date}`,
  );
};

export const fetchMessageDashboard = async ({
  period,
  date,
}: {
  period: PeriodType;
  date: string;
}) => {
  return await httpClient.get<HttpResponseType<MessageDashboardType>>(
    `/dashboard/future-messages?period=${period}&date=${date}`,
  );
};

export const fetchNotificationDashboard = async ({
  period,
  date,
}: {
  period: PeriodType;
  date: string;
}) => {
  return await httpClient.get<HttpResponseType<NotificationDashboardType>>(
    `/dashboard/notifications?period=${period}&date=${date}`,
  );
};

export const fetchSystemDashboard = async ({
  period,
}: {
  period: SystemPeriodType;
}) => {
  return await httpClient.get<HttpResponseType<SystemDashboardType>>(
    `/dashboard/system?period=${period}`,
  );
};

export const fetchActivityDashboard = async ({
  period,
  date,
}: {
  period: PeriodType;
  date: string;
}) => {
  return await httpClient.get<HttpResponseType<ActivityDashboardType>>(
    `/dashboard/activity?period=${period}&date=${date}`,
  );
};

export const fetchProjectIssueDashboard = async ({
  projectId,
}: {
  projectId: string;
}) => {
  return await httpClient.get<HttpResponseType<ProjectIssueDashboardDto>>(
    `/dashboard/projects/${projectId}/issues`,
  );
};

export const fetchSprintDashboard = async ({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}) => {
  return await httpClient.get<HttpResponseType<SprintDashboardDto>>(
    `/dashboard/projects/${projectId}/sprints/${sprintId}`,
  );
};
