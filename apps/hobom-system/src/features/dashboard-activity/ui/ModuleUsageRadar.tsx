import { Chart } from "hobom-design-system/charts";
import { Hb } from "@/shared/ui";

interface ModuleUsageRadarProps {
  data: { module: string; count: number; percentage: number }[];
}

const MODULE_LABEL: Record<string, string> = {
  daily_todo: "할 일",
  note: "노트",
  message: "메시지",
  notification: "알림",
  menu: "메뉴",
};

export const ModuleUsageRadar = ({ data }: ModuleUsageRadarProps) => {
  const chartData = data.map((d) => ({
    ...d,
    label: MODULE_LABEL[d.module] ?? d.module,
  }));

  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        모듈별 활동 비중
      </Hb.Text>
      <Chart
        type="radar"
        data={chartData}
        config={{ x: "label", y: "percentage", color: "#4680ff" }}
        height={260}
        ariaLabel="모듈별 활동 비중"
      />
    </Hb.Box>
  );
};
