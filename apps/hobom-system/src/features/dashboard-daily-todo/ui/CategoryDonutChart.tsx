import { Chart } from "hobom-design-system/charts";
import { CHART_COLORS } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface CategoryDonutChartProps {
  data: {
    categoryId: string;
    categoryTitle: string;
    total: number;
    completed: number;
  }[];
}

export const CategoryDonutChart = ({ data }: CategoryDonutChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        카테고리별 분포
      </Hb.Text>
      <Chart
        type="donut"
        data={data}
        config={{ label: "categoryTitle", value: "total", colors: CHART_COLORS }}
        height={260}
        ariaLabel="카테고리별 분포"
      />
    </Hb.Box>
  );
};
