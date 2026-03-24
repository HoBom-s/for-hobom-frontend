import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import { Hb } from "@/shared/ui";
import {
  analyticsQueries,
  TimeRangeSelector,
  DEFAULT_TIME_RANGE,
  type TimeRange,
} from "@/entities/analytics";
import { LatencyKpiRow } from "./LatencyKpiRow";
import { TrafficTrendChart } from "./TrafficTrendChart";
import { ErrorTrendChart } from "./ErrorTrendChart";
import { StatusCodeChart } from "./StatusCodeChart";
import { ErrorDistributionChart } from "./ErrorDistributionChart";
import { SlowEndpointTable } from "./SlowEndpointTable";
import { RecentErrorTable } from "./RecentErrorTable";

interface OverviewContentProps {
  onTraceClick: (traceId: string) => void;
}

export const OverviewContent = ({ onTraceClick }: OverviewContentProps) => {
  const [range, setRange] = useState<TimeRange>(DEFAULT_TIME_RANGE);

  const { data: trafficTrends } = useSuspenseQuery(analyticsQueries.trafficTrends(range));
  const { data: statusCodes } = useSuspenseQuery(analyticsQueries.statusCodes(range));
  const { data: latency } = useSuspenseQuery(analyticsQueries.latency(range));
  const { data: slowEndpoints } = useSuspenseQuery(analyticsQueries.slowEndpoints(range));
  const { data: errorTrend } = useSuspenseQuery(analyticsQueries.errorTrend(range));
  const { data: errorDistribution } = useSuspenseQuery(analyticsQueries.errorDistribution(range));
  const { data: recentErrors } = useSuspenseQuery(analyticsQueries.recentErrors(range));

  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Hb.Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TimeRangeSelector value={range} onChange={setRange} />
      </Hb.Box>

      <LatencyKpiRow data={latency} />

      <Hb.Grid container spacing={3}>
        <Hb.Grid size={{ xs: 12, md: 6 }}>
          <TrafficTrendChart data={trafficTrends.points} />
        </Hb.Grid>
        <Hb.Grid size={{ xs: 12, md: 6 }}>
          <ErrorTrendChart data={errorTrend.points} />
        </Hb.Grid>
      </Hb.Grid>

      <Hb.Grid container spacing={3}>
        <Hb.Grid size={{ xs: 12, md: 6 }}>
          <StatusCodeChart data={statusCodes.summary} />
        </Hb.Grid>
        <Hb.Grid size={{ xs: 12, md: 6 }}>
          <ErrorDistributionChart data={errorDistribution.byExceptionType} />
        </Hb.Grid>
      </Hb.Grid>

      <Hb.Grid container spacing={3}>
        <Hb.Grid size={{ xs: 12, md: 6 }}>
          <SlowEndpointTable data={slowEndpoints.endpoints} />
        </Hb.Grid>
        <Hb.Grid size={{ xs: 12, md: 6 }}>
          <RecentErrorTable data={recentErrors.errors} onTraceClick={onTraceClick} />
        </Hb.Grid>
      </Hb.Grid>
    </Hb.Box>
  );
};
