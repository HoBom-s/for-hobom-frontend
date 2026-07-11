import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface MonthlySentBarChartProps {
  data: { month: string; count: number }[];
}

export const MonthlySentBarChart = ({ data }: MonthlySentBarChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        월별 발송 추이
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "month", y: "count", color: "#4680ff" }}
        height={260}
        ariaLabel="월별 발송 추이"
      />
    </Hb.Box>
  );
};
