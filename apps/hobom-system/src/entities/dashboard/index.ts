import { dashboardQueries } from "./api/dashboard.queries";
import {
  PeriodModel,
  SystemPeriodModel,
  SYSTEM_PERIOD_HOURS,
} from "./model/dashboard-period.model";
import { CHART_COLORS } from "./model/dashboard-chart.model";
import { DashboardPaper } from "./ui/DashboardPaper";
import { KpiCard } from "./ui/KpiCard";
import { PeriodSelector } from "./ui/PeriodSelector";
import type { PeriodType, SystemPeriodType } from "./api/dashboard.type";

export {
  dashboardQueries,
  CHART_COLORS,
  PeriodModel,
  SystemPeriodModel,
  SYSTEM_PERIOD_HOURS,
  DashboardPaper,
  KpiCard,
  PeriodSelector,
};

export type { PeriodType, SystemPeriodType };
export type { ProjectIssueDashboardDto } from "./api/dashboard.type";
