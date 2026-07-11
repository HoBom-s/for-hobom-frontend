import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface RetryDistributionBarProps {
  data: { retryCount: number; count: number }[];
}

export const RetryDistributionBar = ({ data }: RetryDistributionBarProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        재시도 분포
      </Hb.Text>
      <Chart
        type="bar"
        data={data}
        config={{ x: "retryCount", y: "count", color: "#e58a00", formatX: (v) => `${v}회` }}
        height={260}
        ariaLabel="재시도 분포"
      />
    </Hb.Box>
  );
};
