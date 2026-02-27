import { useSuspenseQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
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
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <ThroughputLineChart data={d.hourlyThroughput} />
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <FailureTable data={d.recentFailures} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <RetryDistributionBar data={d.retryDistribution} />
        </Paper>
      </Grid>
    </Grid>
  );
};
