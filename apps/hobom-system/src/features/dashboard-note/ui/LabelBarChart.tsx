import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface LabelBarChartProps {
  data: { labelId: string; count: number }[];
}

export const LabelBarChart = ({ data }: LabelBarChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        라벨별 노트 수
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "labelId", y: "count", color: "#4680ff", horizontal: true, margin: { left: 80 } }}
        height={260}
        ariaLabel="라벨별 노트 수"
      />
    </Hb.Box>
  );
};
