import { dashboardQueries } from "./api/dashboard.queries";
import { PeriodModel, SystemPeriodModel } from "./model/dashboard-period.model";
import { KpiCard } from "./ui/KpiCard";
import { PeriodSelector } from "./ui/PeriodSelector";

import type { PeriodType, SystemPeriodType } from "./api/dashboard.type";

export {
  dashboardQueries,
  PeriodModel,
  SystemPeriodModel,
  KpiCard,
  PeriodSelector,
};

export type { PeriodType, SystemPeriodType };
