import { useSuspenseQuery } from "hobom-data";
import {
  CheckCircleOutline,
  FormatListNumbered,
  TrendingUp,
  Favorite,
} from "hobom-design-system/icons";
import { DashboardPaper, dashboardQueries, KpiCard, type PeriodType } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";
import { CompletionRateLineChart } from "./CompletionRateLineChart";
import { CategoryDonutChart } from "./CategoryDonutChart";
import { CycleProgressBar } from "./CycleProgressBar";

interface DailyTodoDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const DailyTodoDashboardContent = ({ period, date }: DailyTodoDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.dailyTodos(period, date));
  const d = data.items;

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 할 일"
          value={d.overview.total}
          suffix="개"
          icon={<FormatListNumbered fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료"
          value={d.overview.completed}
          suffix="개"
          icon={<CheckCircleOutline fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료율"
          value={Math.round(d.overview.completionRate * 100)}
          suffix="%"
          icon={<TrendingUp fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="리액션"
          value={d.overview.reactionsCount}
          suffix="개"
          icon={<Favorite fontSize="small" />}
        />
      </Hb.Grid>

      <Hb.Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <CompletionRateLineChart data={d.daily} />
        </DashboardPaper>
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <CategoryDonutChart data={d.byCategory} />
        </DashboardPaper>
      </Hb.Grid>

      <Hb.Grid size={12}>
        <DashboardPaper>
          <CycleProgressBar data={d.byCycle} />
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};
