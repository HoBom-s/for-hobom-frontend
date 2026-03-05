import { Box, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { LogRequestCount } from "@/entities/log";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  const value = payload[0].value ?? 0;
  return (
    <div
      style={{
        backgroundColor: "#1d2630",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>
        {String(label).slice(11, 16)}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#fff",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value.toLocaleString()}
        </span>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>req/min</span>
      </div>
    </div>
  );
};

interface RequestVolumeChartProps {
  data: LogRequestCount[];
}

export const RequestVolumeChart = ({ data }: RequestVolumeChartProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        분당 요청량
      </Typography>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaRequestVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#818cf8" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="#f0f0f0"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="minute"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            tickFormatter={(v: string) => v.slice(11, 16)}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
            }
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#22d3ee",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="totalRequests"
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#areaRequestVolume)"
            activeDot={{
              r: 5,
              fill: "#22d3ee",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
