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
} from "./dashboard.type";

export const fetchDailyTodoDashboard = async ({
  period,
  date,
}: {
  period: PeriodType;
  date: string;
}) => {
  return await httpClient.get<HttpResponseType<DailyTodoDashboardType>>(
    `/api/dashboard/daily-todos?period=${period}&date=${date}`,
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
    `/api/dashboard/notes?period=${period}&date=${date}`,
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
    `/api/dashboard/future-messages?period=${period}&date=${date}`,
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
    `/api/dashboard/notifications?period=${period}&date=${date}`,
  );
};

export const fetchSystemDashboard = async ({
  period,
}: {
  period: SystemPeriodType;
}) => {
  return await httpClient.get<HttpResponseType<SystemDashboardType>>(
    `/api/dashboard/system?period=${period}`,
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
    `/api/dashboard/activity?period=${period}&date=${date}`,
  );
};
