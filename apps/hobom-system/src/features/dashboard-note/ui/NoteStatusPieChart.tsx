import { Chart } from "hobom-design-system/charts";
import { CHART_COLORS } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface NoteStatusPieChartProps {
  data: { status: string; count: number }[];
}

export const NoteStatusPieChart = ({ data }: NoteStatusPieChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        노트 상태 분포
      </Hb.Text>
      <Chart
        type="donut"
        data={data}
        config={{ label: "status", value: "count", colors: CHART_COLORS }}
        height={260}
        ariaLabel="노트 상태 분포"
      />
    </Hb.Box>
  );
};
