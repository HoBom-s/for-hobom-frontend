import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        반복주기별 완료 현황
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} barSize={28}>
          <defs>
            <linearGradient id="cycleBarGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2ca87f" stopOpacity={1} />
              <stop offset="100%" stopColor="#2ca87f" stopOpacity={0.65} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(44,168,127,0.06)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "#8c8c8c" }}
          />
          <Bar
            dataKey="completed"
            name="완료"
            stackId="a"
            fill="url(#cycleBarGreen)"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="incomplete"
            name="미완료"
            stackId="a"
            fill="#e9ecef"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
