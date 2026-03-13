import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
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
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        모듈별 활동 비중
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar
            dataKey="percentage"
            stroke="#4680ff"
            fill="#4680ff"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
