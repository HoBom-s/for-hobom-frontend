import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Hb } from "@/shared/ui";

interface ReadUnreadStackedBarProps {
  data: { date: string; count: number }[];
}

export const ReadUnreadStackedBar = ({ data }: ReadUnreadStackedBarProps) => {
  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        일별 알림 추이
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={24}>
          <defs>
            <linearGradient id="notifBarBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4680ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#4680ff" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            tickFormatter={(v: string) => v.slice(5)}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(70,128,255,0.06)" }}
            labelFormatter={(v) => String(v).slice(5)}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Bar
            dataKey="count"
            name="알림 수"
            fill="url(#notifBarBlue)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
