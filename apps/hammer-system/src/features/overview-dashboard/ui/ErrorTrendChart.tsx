import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import type { ErrorTrendPoint } from "@/entities/analytics";

interface ErrorTrendChartProps {
  data: ErrorTrendPoint[];
}

const formatTime = (ts: string) => ts.slice(11, 16);

export const ErrorTrendChart = ({ data }: ErrorTrendChartProps) => {
  return (
    <DashboardPaper>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        Error Trends
      </Hb.Text>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barSize={16}>
          <defs>
            <linearGradient id="errorBarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
              <stop offset="100%" stopColor="#f87171" stopOpacity={0.55} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="bucket"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            tickFormatter={formatTime}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: "#8c8c8c" }} axisLine={false} tickLine={false} />
          <Tooltip
            labelFormatter={(v) => String(v).replace("T", " ").slice(0, 19)}
            cursor={{ fill: "rgba(248,113,113,0.06)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Bar dataKey="errorCount" name="Errors" fill="url(#errorBarGrad)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </DashboardPaper>
  );
};
