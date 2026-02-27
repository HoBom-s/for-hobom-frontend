export type PeriodType = "WEEKLY" | "MONTHLY";
export type SystemPeriodType = "LAST_24H" | "LAST_7D" | "LAST_30D";

// API 1: 할 일 대시보드
export interface DailyTodoDashboardType {
  period: PeriodType;
  startDate: string;
  endDate: string;
  overview: {
    total: number;
    completed: number;
    completionRate: number;
    reactionsCount: number;
  };
  daily: {
    date: string;
    total: number;
    completed: number;
    completionRate: number;
  }[];
  byCategory: {
    categoryId: string;
    categoryTitle: string;
    total: number;
    completed: number;
  }[];
  byCycle: {
    cycle: string;
    total: number;
    completed: number;
  }[];
}

// API 2: 노트 대시보드
export interface NoteDashboardType {
  overview: {
    total: number;
    checklistCompletionRate: number;
  };
  byStatus: { status: string; count: number }[];
  byType: { type: string; count: number }[];
  byLabel: { labelId: string; count: number }[];
  dailyCreated: { date: string; count: number }[];
}

// API 3: 미래 메시지 대시보드
export interface MessageDashboardType {
  overview: {
    total: number;
    pending: number;
    sent: number;
  };
  upcoming: {
    id: string;
    title: string;
    recipientId: string;
    scheduledAt: string;
  }[];
  monthlyTrend: { month: string; count: number }[];
}

// API 4: 알림 대시보드
export interface NotificationDashboardType {
  period: PeriodType;
  startDate: string;
  endDate: string;
  overview: {
    total: number;
    read: number;
    unread: number;
  };
  dailyTrend: { date: string; count: number }[];
  byCategory: { category: string; count: number }[];
  recentUnread: {
    id: string;
    title: string;
    category: string;
    createdAt: string;
  }[];
}

// API 5: 시스템 대시보드
export interface SystemDashboardType {
  period: SystemPeriodType;
  startDate: string;
  endDate: string;
  overview: {
    total: number;
    sent: number;
    failed: number;
    pending: number;
    successRate: number;
  };
  byEventType: { eventType: string; count: number }[];
  hourlyThroughput: { hour: number; count: number }[];
  recentFailures: {
    eventId: string;
    eventType: string;
    lastError: string | null;
    retryCount: number;
    failedAt: string | null;
  }[];
  retryDistribution: { retryCount: number; count: number }[];
}

// API 6: 활동 대시보드
export interface ActivityDashboardType {
  period: PeriodType;
  startDate: string;
  endDate: string;
  overview: {
    activeDays: number;
    totalDays: number;
    activityRate: number;
    currentStreak: number;
    longestStreak: number;
  };
  heatmap: { date: string; count: number; level: number }[];
  moduleUsage: { module: string; count: number; percentage: number }[];
}
