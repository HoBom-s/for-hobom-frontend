import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Hb } from "@/shared/ui";

interface ThroughputLineChartProps {
  data: { hour: number; count: number }[];
}

export const ThroughputLineChart = ({ data }: ThroughputLineChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        시간대별 처리량
      </Hb.Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={20}>
          <defs>
            <linearGradient id="barThroughput" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4680ff" stopOpacity={1} />
              <stop offset="100%" stopColor="#4680ff" stopOpacity={0.55} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            tickFormatter={(v: number) => `${v}시`}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
          <Tooltip
            labelFormatter={(v) => `${v}시`}
            cursor={{ fill: "rgba(70,128,255,0.06)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Bar dataKey="count" name="처리량" fill="url(#barThroughput)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
