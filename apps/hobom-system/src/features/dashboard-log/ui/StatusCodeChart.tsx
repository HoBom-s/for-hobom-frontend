import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { LogStatusCount } from "@/entities/log";
import { Hb } from "@/shared/ui";
import { getStatusColor, getStatusLabel } from "../lib/log-dashboard.lib";

interface ChartTooltipProps {
  active?: boolean;
  payload?: { payload: LogStatusCount }[];
}

const CustomTooltip = ({ active, payload }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const color = getStatusColor(item.statusCode);

  return (
    <div
      style={{
        backgroundColor: "#1d2630",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        <span style={{ fontSize: 12, color: "#94a3b8" }}>
          {item.statusCode} {getStatusLabel(item.statusCode)}
        </span>
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
          {item.count.toLocaleString()}
        </span>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>건</span>
      </div>
    </div>
  );
};

interface StatusCodeChartProps {
  data: LogStatusCount[];
}

export const StatusCodeChart = ({ data }: StatusCodeChartProps) => {
  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        HTTP 상태 코드 분포
      </Hb.Text>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <BarChart data={data} barCategoryGap="25%">
          <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="4 4" />
          <XAxis
            dataKey="statusCode"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(70,128,255,0.04)" }} />
          <Bar
            dataKey="count"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
            animationBegin={0}
            animationDuration={600}
          >
            {data.map((entry) => (
              <Cell key={entry.statusCode} fill={getStatusColor(entry.statusCode)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
