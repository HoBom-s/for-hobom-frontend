import { Chart } from "hobom-design-system/charts";
import { CHART_COLORS } from "@/entities/dashboard";
import type { ProjectIssueDashboardDto } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface StatusDistributionChartProps {
  data: ProjectIssueDashboardDto["byStatus"];
}

export const StatusDistributionChart = ({ data }: StatusDistributionChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        상태별 분포
      </Hb.Text>
      <Chart
        type="donut"
        data={data}
        config={{ label: "status", value: "count", colors: CHART_COLORS }}
        height={260}
        ariaLabel="상태별 분포"
      />
    </Hb.Box>
  );
};
