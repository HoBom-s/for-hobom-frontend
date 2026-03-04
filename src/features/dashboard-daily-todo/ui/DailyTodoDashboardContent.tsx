import { useSuspenseQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import {
  DashboardPaper,
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import {
  CheckCircleOutline,
  FormatListNumbered,
  TrendingUp,
  Favorite,
} from "@mui/icons-material";
import { CompletionRateLineChart } from "./CompletionRateLineChart";
import { CategoryDonutChart } from "./CategoryDonutChart";
import { CycleProgressBar } from "./CycleProgressBar";

interface DailyTodoDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const DailyTodoDashboardContent = ({
  period,
  date,
}: DailyTodoDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.dailyTodos(period, date));
  const d = data.items;

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 할 일"
          value={d.overview.total}
          suffix="개"
          icon={<FormatListNumbered fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료"
          value={d.overview.completed}
          suffix="개"
          icon={<CheckCircleOutline fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료율"
          value={Math.round(d.overview.completionRate * 100)}
          suffix="%"
          icon={<TrendingUp fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="리액션"
          value={d.overview.reactionsCount}
          suffix="개"
          icon={<Favorite fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <CompletionRateLineChart data={d.daily} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <CategoryDonutChart data={d.byCategory} />
        </DashboardPaper>
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <CycleProgressBar data={d.byCycle} />
        </DashboardPaper>
      </Grid>
    </Grid>
  );
};
