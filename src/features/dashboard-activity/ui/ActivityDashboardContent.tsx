import { useSuspenseQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import { CalendarMonth, Today, TrendingUp } from "@mui/icons-material";
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
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="활동일"
          value={d.overview.activeDays}
          suffix={`/ ${d.overview.totalDays}일`}
          icon={<CalendarMonth fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="활동률"
          value={Math.round(d.overview.activityRate * 100)}
          suffix="%"
          icon={<TrendingUp fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="현재 연속"
          value={d.overview.currentStreak}
          suffix="일"
          icon={<Today fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="최장 연속"
          value={d.overview.longestStreak}
          suffix="일"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <ActivityHeatmap data={d.heatmap} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <StreakBadge
            currentStreak={d.overview.currentStreak}
            longestStreak={d.overview.longestStreak}
          />
        </Paper>
      </Grid>

      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <ModuleUsageRadar data={d.moduleUsage} />
        </Paper>
      </Grid>
    </Grid>
  );
};
