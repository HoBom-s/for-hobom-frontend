import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import type { TrafficTrendPoint } from "@/entities/analytics";

interface TrafficTrendChartProps {
  data: TrafficTrendPoint[];
}

const formatTime = (ts: string) => ts.slice(11, 16);

export const TrafficTrendChart = ({ data }: TrafficTrendChartProps) => {
  return (
    <DashboardPaper>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        Traffic Trends
      </Hb.Text>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4680ff" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4680ff" stopOpacity={0.02} />
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
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="requestCount"
            name="Requests"
            stroke="#4680ff"
            strokeWidth={2}
            fill="url(#trafficGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardPaper>
  );
};
