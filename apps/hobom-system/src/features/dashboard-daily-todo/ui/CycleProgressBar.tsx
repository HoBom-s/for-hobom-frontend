import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface CycleProgressBarProps {
  data: { cycle: string; total: number; completed: number }[];
}

const CYCLE_LABEL: Record<string, string> = {
  EVERYDAY: "매일",
  EVERY_WEEKDAY: "평일",
  EVERY_WEEKEND: "주말",
};

export const CycleProgressBar = ({ data }: CycleProgressBarProps) => {
  const chartData = data.map((d) => ({
    ...d,
    label: CYCLE_LABEL[d.cycle] ?? d.cycle,
    incomplete: d.total - d.completed,
  }));

  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        반복주기별 완료 현황
      </Hb.Text>
      <Chart
        type="bar"
        data={chartData}
        config={{
          x: "label",
          series: [
            { key: "completed", label: "완료", color: "#2ca87f" },
            { key: "incomplete", label: "미완료", color: "#e9ecef" },
          ],
          stacked: true,
        }}
        height={260}
        ariaLabel="반복주기별 완료 현황"
      />
    </Hb.Box>
  );
};
