import { useSuspenseQuery } from "@tanstack/react-query";
import { CalendarMonth, Today, TrendingUp } from "hobom-design-system/icons";
import {
  DashboardPaper,
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import { Hb } from "@/shared/ui";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { ModuleUsageRadar } from "./ModuleUsageRadar";
import { StreakBadge } from "./StreakBadge";

interface ActivityDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const ActivityDashboardContent = ({
  period,
  date,
}: ActivityDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.activity(period, date));
  const d = data.items;

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="활동일"
          value={d.overview.activeDays}
          suffix={`/ ${d.overview.totalDays}일`}
          icon={<CalendarMonth fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="활동률"
          value={Math.round(d.overview.activityRate * 100)}
          suffix="%"
          icon={<TrendingUp fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="현재 연속"
          value={d.overview.currentStreak}
          suffix="일"
          icon={<Today fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="최장 연속"
          value={d.overview.longestStreak}
          suffix="일"
        />
      </Hb.Grid>

      <Hb.Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <ActivityHeatmap data={d.heatmap} />
        </DashboardPaper>
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <StreakBadge
            currentStreak={d.overview.currentStreak}
            longestStreak={d.overview.longestStreak}
          />
        </DashboardPaper>
      </Hb.Grid>

      <Hb.Grid size={12}>
        <DashboardPaper>
          <ModuleUsageRadar data={d.moduleUsage} />
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};
