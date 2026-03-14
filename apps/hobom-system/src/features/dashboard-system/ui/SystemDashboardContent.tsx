import { useSuspenseQuery } from "hobom-data";
import { Speed, CheckCircle, ErrorOutline, HourglassEmpty } from "hobom-design-system/icons";
import {
  DashboardPaper,
  dashboardQueries,
  KpiCard,
  type SystemPeriodType,
} from "@/entities/dashboard";
import { Hb } from "@/shared/ui";
import { ThroughputLineChart } from "./ThroughputLineChart";
import { FailureTable } from "./FailureTable";
import { RetryDistributionBar } from "./RetryDistributionBar";

interface SystemDashboardContentProps {
  period: SystemPeriodType;
}

export const SystemDashboardContent = ({ period }: SystemDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.system(period));
  const d = data.items;

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 이벤트"
          value={d.overview.total.toLocaleString()}
          suffix="건"
          icon={<Speed fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="성공률"
          value={Math.round(d.overview.successRate * 100)}
          suffix="%"
          icon={<CheckCircle fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="실패"
          value={d.overview.failed}
          suffix="건"
          icon={<ErrorOutline fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="대기"
          value={d.overview.pending}
          suffix="건"
          icon={<HourglassEmpty fontSize="small" />}
        />
      </Hb.Grid>

      <Hb.Grid size={12}>
        <DashboardPaper>
          <ThroughputLineChart data={d.hourlyThroughput} />
        </DashboardPaper>
      </Hb.Grid>

      <Hb.Grid size={{ xs: 12, md: 7 }}>
        <DashboardPaper>
          <FailureTable data={d.recentFailures} />
        </DashboardPaper>
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, md: 5 }}>
        <DashboardPaper>
          <RetryDistributionBar data={d.retryDistribution} />
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};
