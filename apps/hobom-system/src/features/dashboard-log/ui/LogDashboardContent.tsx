import { useSuspenseQueries } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import {
  Http,
  ErrorOutline,
  ReportProblemOutlined,
  BugReportOutlined,
} from "@mui/icons-material";
import {
  DashboardPaper,
  KpiCard,
  SYSTEM_PERIOD_HOURS,
  type SystemPeriodType,
} from "@/entities/dashboard";
import { logQueries } from "@/entities/log";
import { computeKpiSummary } from "../lib/log-dashboard.lib";
import { LevelDistributionChart } from "./LevelDistributionChart";
import { ServiceTrafficChart } from "./ServiceTrafficChart";
import { RequestVolumeChart } from "./RequestVolumeChart";
import { EndpointErrorTable } from "./EndpointErrorTable";
import { StatusCodeChart } from "./StatusCodeChart";
import { LogSearchSection } from "./LogSearchSection";

interface LogDashboardContentProps {
  period: SystemPeriodType;
}

export const LogDashboardContent = ({ period }: LogDashboardContentProps) => {
  const hours = SYSTEM_PERIOD_HOURS[period];

  const [
    { data: levelData },
    { data: serviceData },
    { data: statusData },
    { data: requestData },
    { data: endpointData },
  ] = useSuspenseQueries({
    queries: [
      logQueries.levelSummary(hours),
      logQueries.serviceSummary(hours),
      logQueries.statusSummary(hours),
      logQueries.requestSummary(hours),
      logQueries.endpointErrors(hours),
    ],
  });

  const { totalRequests, count4xx, count5xx, errorRate } = computeKpiSummary(
    statusData.items,
  );

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 요청"
          value={totalRequests.toLocaleString()}
          suffix="건"
          icon={<Http fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="에러율"
          value={errorRate}
          suffix="%"
          icon={<ErrorOutline fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="4xx 에러"
          value={count4xx.toLocaleString()}
          suffix="건"
          icon={<ReportProblemOutlined fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="5xx 에러"
          value={count5xx.toLocaleString()}
          suffix="건"
          icon={<BugReportOutlined fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardPaper>
          <LevelDistributionChart data={levelData.items} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DashboardPaper>
          <ServiceTrafficChart data={serviceData.items} />
        </DashboardPaper>
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <RequestVolumeChart data={requestData.items} />
        </DashboardPaper>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <DashboardPaper sx={{ height: "100%" }}>
          <EndpointErrorTable data={endpointData.items} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <DashboardPaper sx={{ height: "100%" }}>
          <StatusCodeChart data={statusData.items} />
        </DashboardPaper>
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <LogSearchSection />
        </DashboardPaper>
      </Grid>
    </Grid>
  );
};
