import { Chart } from "hobom-design-system/charts";
import type { ProjectIssueDashboardDto } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface TypeDistributionChartProps {
  data: ProjectIssueDashboardDto["byType"];
}

export const TypeDistributionChart = ({ data }: TypeDistributionChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        유형별 분포
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "type", y: "count", color: "#34d399", horizontal: true, margin: { left: 80 } }}
        height={260}
        ariaLabel="유형별 분포"
      />
    </Hb.Box>
  );
};
