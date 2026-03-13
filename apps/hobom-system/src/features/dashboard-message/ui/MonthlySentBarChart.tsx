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

interface MonthlySentBarChartProps {
  data: { month: string; count: number }[];
}

export const MonthlySentBarChart = ({ data }: MonthlySentBarChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        월별 발송 추이
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={32}>
          <defs>
            <linearGradient id="msgBarBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4680ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#4680ff" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
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
            cursor={{ fill: "rgba(70,128,255,0.06)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Bar
            dataKey="count"
            name="발송 수"
            fill="url(#msgBarBlue)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
