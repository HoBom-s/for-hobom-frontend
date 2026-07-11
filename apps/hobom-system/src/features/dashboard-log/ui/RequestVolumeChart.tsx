import { Chart } from "hobom-design-system/charts";
import type { LogRequestCount } from "@/entities/log";
import { Hb } from "@/shared/ui";

interface RequestVolumeChartProps {
  data: LogRequestCount[];
}

export const RequestVolumeChart = ({ data }: RequestVolumeChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        분당 요청량
      </Hb.Text>
      <Chart
        type="area"
        data={data}
        config={{
          x: "minute",
          y: "totalRequests",
          color: "#22d3ee",
          formatX: (v) => v.slice(11, 16),
          formatValue: (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)),
        }}
        height={280}
        ariaLabel="분당 요청량"
      />
    </Hb.Box>
  );
};
