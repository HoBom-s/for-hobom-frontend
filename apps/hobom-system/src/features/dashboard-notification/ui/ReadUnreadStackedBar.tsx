import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface ReadUnreadStackedBarProps {
  data: { date: string; count: number }[];
}

export const ReadUnreadStackedBar = ({ data }: ReadUnreadStackedBarProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        일별 알림 추이
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "date", y: "count", color: "#4680ff", formatX: (v) => v.slice(5) }}
        height={260}
        ariaLabel="일별 알림 추이"
      />
    </Hb.Box>
  );
};
