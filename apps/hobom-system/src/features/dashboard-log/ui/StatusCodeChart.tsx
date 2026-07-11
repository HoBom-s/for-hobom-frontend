import { Chart } from "hobom-design-system/charts";
import type { LogStatusCount } from "@/entities/log";
import { Hb } from "@/shared/ui";
import { getStatusColor } from "../lib/log-dashboard.lib";

interface StatusCodeChartProps {
  data: LogStatusCount[];
}

export const StatusCodeChart = ({ data }: StatusCodeChartProps) => {
  const chartData = data.map((d) => ({ ...d, color: getStatusColor(d.statusCode) }));

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        HTTP 상태 코드 분포
      </Hb.Text>
      <Chart
        type="bar"
        data={chartData}
        config={{
          x: "statusCode",
          y: "count",
          colorKey: "color",
          formatValue: (v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)),
        }}
        height={260}
        ariaLabel="HTTP 상태 코드 분포"
      />
    </Hb.Box>
  );
};
