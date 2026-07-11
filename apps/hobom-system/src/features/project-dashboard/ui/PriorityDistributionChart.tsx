import { Chart } from "hobom-design-system/charts";
import type { ProjectIssueDashboardDto } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface PriorityDistributionChartProps {
  data: ProjectIssueDashboardDto["byPriority"];
}

export const PriorityDistributionChart = ({ data }: PriorityDistributionChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        우선순위별 분포
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "priority", y: "count", color: "#4680ff", horizontal: true, margin: { left: 80 } }}
        height={260}
        ariaLabel="우선순위별 분포"
      />
    </Hb.Box>
  );
};
