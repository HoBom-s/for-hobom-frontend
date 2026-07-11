import { Chart } from "hobom-design-system/charts";
import { CHART_COLORS } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface NotificationCategoryDonutProps {
  data: { category: string; count: number }[];
}

export const NotificationCategoryDonut = ({ data }: NotificationCategoryDonutProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        카테고리별 알림 분포
      </Hb.Text>
      <Chart
        type="donut"
        data={data}
        config={{ label: "category", value: "count", colors: CHART_COLORS }}
        height={260}
        ariaLabel="카테고리별 알림 분포"
      />
    </Hb.Box>
  );
};
