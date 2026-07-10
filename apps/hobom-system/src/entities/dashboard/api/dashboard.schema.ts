import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type {
  DailyTodoDashboardType,
  NoteDashboardType,
  MessageDashboardType,
  NotificationDashboardType,
  SystemDashboardType,
  ActivityDashboardType,
  ProjectIssueDashboardDto,
  SprintDashboardDto,
} from "./dashboard.type";

export const dailyTodoDashboardSchema: Schema<DailyTodoDashboardType> = HoBomSchema.object({
  period: HoBomSchema.enum(["WEEKLY", "MONTHLY"]),
  startDate: HoBomSchema.date(),
  endDate: HoBomSchema.date(),
  overview: HoBomSchema.object({
    total: HoBomSchema.number(),
    completed: HoBomSchema.number(),
    completionRate: HoBomSchema.number(),
    reactionsCount: HoBomSchema.number(),
  }),
  daily: HoBomSchema.array(
    HoBomSchema.object({
      date: HoBomSchema.date(),
      total: HoBomSchema.number(),
      completed: HoBomSchema.number(),
      completionRate: HoBomSchema.number(),
    }),
  ),
  byCategory: HoBomSchema.array(
    HoBomSchema.object({
      categoryId: HoBomSchema.string(),
      categoryTitle: HoBomSchema.string(),
      total: HoBomSchema.number(),
      completed: HoBomSchema.number(),
    }),
  ),
  byCycle: HoBomSchema.array(
    HoBomSchema.object({
      cycle: HoBomSchema.string(),
      total: HoBomSchema.number(),
      completed: HoBomSchema.number(),
    }),
  ),
});

export const noteDashboardSchema: Schema<NoteDashboardType> = HoBomSchema.object({
  overview: HoBomSchema.object({
    total: HoBomSchema.number(),
    checklistCompletionRate: HoBomSchema.number(),
  }),
  byStatus: HoBomSchema.array(
    HoBomSchema.object({ status: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  byType: HoBomSchema.array(
    HoBomSchema.object({ type: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  byLabel: HoBomSchema.array(
    HoBomSchema.object({ labelId: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  dailyCreated: HoBomSchema.array(
    HoBomSchema.object({ date: HoBomSchema.date(), count: HoBomSchema.number() }),
  ),
});

export const messageDashboardSchema: Schema<MessageDashboardType> = HoBomSchema.object({
  overview: HoBomSchema.object({
    total: HoBomSchema.number(),
    pending: HoBomSchema.number(),
    sent: HoBomSchema.number(),
  }),
  upcoming: HoBomSchema.array(
    HoBomSchema.object({
      id: HoBomSchema.string(),
      title: HoBomSchema.string(),
      recipientId: HoBomSchema.string(),
      scheduledAt: HoBomSchema.date(),
    }),
  ),
  monthlyTrend: HoBomSchema.array(
    HoBomSchema.object({ month: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
});

export const notificationDashboardSchema: Schema<NotificationDashboardType> = HoBomSchema.object({
  period: HoBomSchema.enum(["WEEKLY", "MONTHLY"]),
  startDate: HoBomSchema.date(),
  endDate: HoBomSchema.date(),
  overview: HoBomSchema.object({
    total: HoBomSchema.number(),
    read: HoBomSchema.number(),
    unread: HoBomSchema.number(),
  }),
  dailyTrend: HoBomSchema.array(
    HoBomSchema.object({ date: HoBomSchema.date(), count: HoBomSchema.number() }),
  ),
  byCategory: HoBomSchema.array(
    HoBomSchema.object({ category: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  recentUnread: HoBomSchema.array(
    HoBomSchema.object({
      id: HoBomSchema.string(),
      title: HoBomSchema.string(),
      category: HoBomSchema.string(),
      createdAt: HoBomSchema.date(),
    }),
  ),
});

export const systemDashboardSchema: Schema<SystemDashboardType> = HoBomSchema.object({
  period: HoBomSchema.enum(["LAST_24H", "LAST_7D", "LAST_30D"]),
  startDate: HoBomSchema.date(),
  endDate: HoBomSchema.date(),
  overview: HoBomSchema.object({
    total: HoBomSchema.number(),
    sent: HoBomSchema.number(),
    failed: HoBomSchema.number(),
    pending: HoBomSchema.number(),
    successRate: HoBomSchema.number(),
  }),
  byEventType: HoBomSchema.array(
    HoBomSchema.object({ eventType: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  hourlyThroughput: HoBomSchema.array(
    HoBomSchema.object({ hour: HoBomSchema.number(), count: HoBomSchema.number() }),
  ),
  recentFailures: HoBomSchema.array(
    HoBomSchema.object({
      eventId: HoBomSchema.string(),
      eventType: HoBomSchema.string(),
      lastError: HoBomSchema.string().nullable(),
      retryCount: HoBomSchema.number(),
      failedAt: HoBomSchema.date().nullable(),
    }),
  ),
  retryDistribution: HoBomSchema.array(
    HoBomSchema.object({ retryCount: HoBomSchema.number(), count: HoBomSchema.number() }),
  ),
});

export const activityDashboardSchema: Schema<ActivityDashboardType> = HoBomSchema.object({
  period: HoBomSchema.enum(["WEEKLY", "MONTHLY"]),
  startDate: HoBomSchema.date(),
  endDate: HoBomSchema.date(),
  overview: HoBomSchema.object({
    activeDays: HoBomSchema.number(),
    totalDays: HoBomSchema.number(),
    activityRate: HoBomSchema.number(),
    currentStreak: HoBomSchema.number(),
    longestStreak: HoBomSchema.number(),
  }),
  heatmap: HoBomSchema.array(
    HoBomSchema.object({
      date: HoBomSchema.date(),
      count: HoBomSchema.number(),
      level: HoBomSchema.number(),
    }),
  ),
  moduleUsage: HoBomSchema.array(
    HoBomSchema.object({
      module: HoBomSchema.string(),
      count: HoBomSchema.number(),
      percentage: HoBomSchema.number(),
    }),
  ),
});

export const projectIssueDashboardSchema: Schema<ProjectIssueDashboardDto> = HoBomSchema.object({
  overview: HoBomSchema.object({
    total: HoBomSchema.number(),
    open: HoBomSchema.number(),
    done: HoBomSchema.number(),
    completionRate: HoBomSchema.number(),
    overdueCount: HoBomSchema.number(),
  }),
  byStatus: HoBomSchema.array(
    HoBomSchema.object({ status: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  byPriority: HoBomSchema.array(
    HoBomSchema.object({ priority: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
  byType: HoBomSchema.array(
    HoBomSchema.object({ type: HoBomSchema.string(), count: HoBomSchema.number() }),
  ),
});

export const sprintDashboardSchema: Schema<SprintDashboardDto> = HoBomSchema.object({
  sprint: HoBomSchema.object({
    id: HoBomSchema.string(),
    name: HoBomSchema.string(),
    goal: HoBomSchema.string().nullable(),
    status: HoBomSchema.string(),
    startDate: HoBomSchema.date(),
    endDate: HoBomSchema.date(),
  }),
  overview: HoBomSchema.object({
    totalIssues: HoBomSchema.number(),
    completedIssues: HoBomSchema.number(),
    completionRate: HoBomSchema.number(),
    totalStoryPoints: HoBomSchema.number(),
    completedStoryPoints: HoBomSchema.number(),
  }),
});
