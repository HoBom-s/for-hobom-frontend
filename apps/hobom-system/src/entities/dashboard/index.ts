import { dashboardQueries } from "./api/dashboard.queries";
import {
  PeriodModel,
  SystemPeriodModel,
  SYSTEM_PERIOD_HOURS,
} from "./model/dashboard-period.model";
import { CHART_COLORS } from "./model/dashboard-chart.model";
import type { PeriodType, SystemPeriodType } from "./api/dashboard.type";

export { dashboardQueries, CHART_COLORS, PeriodModel, SystemPeriodModel, SYSTEM_PERIOD_HOURS };

export type { PeriodType, SystemPeriodType };
export type { ProjectIssueDashboardDto } from "./api/dashboard.type";
