import { useSuspenseQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import {
  DashboardPaper,
  dashboardQueries,
  KpiCard,
  type SystemPeriodType,
} from "@/entities/dashboard";
import {
  Speed,
  CheckCircle,
  ErrorOutline,
  HourglassEmpty,
} from "@mui/icons-material";
import { ThroughputLineChart } from "./ThroughputLineChart";
import { FailureTable } from "./FailureTable";
import { RetryDistributionBar } from "./RetryDistributionBar";

interface SystemDashboardContentProps {
  period: SystemPeriodType;
}

export const SystemDashboardContent = ({
  period,
}: SystemDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.system(period));
  const d = data.items;

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 이벤트"
          value={d.overview.total.toLocaleString()}
          suffix="건"
          icon={<Speed fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="성공률"
          value={Math.round(d.overview.successRate * 100)}
          suffix="%"
          icon={<CheckCircle fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="실패"
          value={d.overview.failed}
          suffix="건"
          icon={<ErrorOutline fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="대기"
          value={d.overview.pending}
          suffix="건"
          icon={<HourglassEmpty fontSize="small" />}
        />
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <ThroughputLineChart data={d.hourlyThroughput} />
        </DashboardPaper>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <DashboardPaper>
          <FailureTable data={d.recentFailures} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <DashboardPaper>
          <RetryDistributionBar data={d.retryDistribution} />
        </DashboardPaper>
      </Grid>
    </Grid>
  );
};
