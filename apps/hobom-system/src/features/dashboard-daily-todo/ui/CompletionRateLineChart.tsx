import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface CompletionRateLineChartProps {
  data: { date: string; completionRate: number }[];
}

export const CompletionRateLineChart = ({ data }: CompletionRateLineChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        일별 완료율 추이
      </Hb.Text>
      <Chart
        type="line"
        data={data}
        config={{
          x: "date",
          y: "completionRate",
          color: "#4680ff",
          formatX: (v) => v.slice(5),
          formatValue: (v) => `${Math.round(v * 100)}%`,
        }}
        height={260}
        ariaLabel="일별 완료율 추이"
      />
    </Hb.Box>
  );
};
