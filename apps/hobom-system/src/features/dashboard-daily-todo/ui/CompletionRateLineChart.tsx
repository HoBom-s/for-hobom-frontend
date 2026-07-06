import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Hb } from "@/shared/ui";

interface CompletionRateLineChartProps {
  data: { date: string; completionRate: number }[];
}

export const CompletionRateLineChart = ({ data }: CompletionRateLineChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        일별 완료율 추이
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v: string) => v.slice(5)} />
          <YAxis
            domain={[0, 1]}
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
          />
          <Tooltip formatter={(v) => [`${Math.round(Number(v) * 100)}%`, "완료율"]} />
          <Line
            type="monotone"
            dataKey="completionRate"
            stroke="#4680ff"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
