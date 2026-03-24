import { Speed } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { KpiCard } from "@/entities/analytics";
import type { LatencyAnalysisResult } from "@/entities/analytics";

interface LatencyKpiRowProps {
  data: LatencyAnalysisResult;
}

const ITEMS = [
  { label: "Avg Latency", key: "avgMs" as const, description: "전체 요청의 평균 응답 시간" },
  { label: "P50", key: "p50Ms" as const, description: "요청의 50%가 이 시간 이내에 응답 (중간값)" },
  { label: "P95", key: "p95Ms" as const, description: "요청의 95%가 이 시간 이내에 응답" },
  {
    label: "P99",
    key: "p99Ms" as const,
    description: "요청의 99%가 이 시간 이내에 응답 (극단 지연)",
  },
] as const;

export const LatencyKpiRow = ({ data }: LatencyKpiRowProps) => {
  return (
    <Hb.Grid container spacing={2}>
      {ITEMS.map(({ label, key, description }) => (
        <Hb.Grid key={label} size={{ xs: 6, md: 3 }}>
          <KpiCard
            label={label}
            value={Math.round(data[key])}
            suffix="ms"
            icon={<Speed sx={{ fontSize: 20 }} />}
            description={description}
          />
        </Hb.Grid>
      ))}
    </Hb.Grid>
  );
};
