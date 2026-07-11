import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface ThroughputLineChartProps {
  data: { hour: number; count: number }[];
}

export const ThroughputLineChart = ({ data }: ThroughputLineChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        시간대별 처리량
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "hour", y: "count", color: "#4680ff", formatX: (v) => `${v}시` }}
        height={300}
        ariaLabel="시간대별 처리량"
      />
    </Hb.Box>
  );
};
