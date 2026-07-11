import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface NoteCreationAreaChartProps {
  data: { date: string; count: number }[];
}

export const NoteCreationAreaChart = ({ data }: NoteCreationAreaChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        일별 노트 생성 추이
      </Hb.Text>
      <Chart
        type="area"
        data={data}
        config={{ x: "date", y: "count", color: "#4680ff", formatX: (v) => v.slice(5) }}
        height={260}
        ariaLabel="일별 노트 생성 추이"
      />
    </Hb.Box>
  );
};
