import { dashboardQueries } from "./api/dashboard.queries";
import { PeriodModel, SystemPeriodModel } from "./model/dashboard-period.model";
import { CHART_COLORS } from "./model/dashboard-chart.model";
import { KpiCard } from "./ui/KpiCard";
import { PeriodSelector } from "./ui/PeriodSelector";

import type { PeriodType, SystemPeriodType } from "./api/dashboard.type";

export {
  dashboardQueries,
  CHART_COLORS,
  PeriodModel,
  SystemPeriodModel,
  KpiCard,
  PeriodSelector,
};

export type { PeriodType, SystemPeriodType };
