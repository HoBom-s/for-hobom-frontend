import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Hb } from "@/shared/ui";

interface RetryDistributionBarProps {
  data: { retryCount: number; count: number }[];
}

export const RetryDistributionBar = ({ data }: RetryDistributionBarProps) => {
  const chartData = data.map((d) => ({
    ...d,
    label: `${d.retryCount}회`,
  }));

  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        재시도 분포
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} barSize={32}>
          <defs>
            <linearGradient id="retryBarOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e58a00" stopOpacity={1} />
              <stop offset="100%" stopColor="#e58a00" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(229,138,0,0.06)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Bar dataKey="count" name="건수" fill="url(#retryBarOrange)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
