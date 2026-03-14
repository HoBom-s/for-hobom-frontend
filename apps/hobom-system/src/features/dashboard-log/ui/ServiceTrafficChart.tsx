import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "@/entities/dashboard";
import type { LogServiceCount } from "@/entities/log";
import { Hb } from "@/shared/ui";
import { SERVICE_LABEL_MAP } from "../lib/log-dashboard.lib";

interface ServiceTrafficChartProps {
  data: LogServiceCount[];
}

export const ServiceTrafficChart = ({ data }: ServiceTrafficChartProps) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        서비스별 트래픽
      </Hb.Text>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="serviceType"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
              stroke="#fff"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              // @ts-expect-error recharts formatter type mismatch
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                SERVICE_LABEL_MAP[name] ?? name,
              ]}
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: 13,
                padding: "8px 12px",
              }}
            />
            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 18, fontWeight: 700, fill: "#1d2630" }}
            >
              {total.toLocaleString()}
            </text>
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 11, fill: "#8c8c8c" }}
            >
              전체 요청
            </text>
          </PieChart>
        </ResponsiveContainer>
        <Hb.Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {data.map((entry, i) => {
            const pct = total > 0 ? (entry.count / total) * 100 : 0;
            const color = CHART_COLORS[i % CHART_COLORS.length];

            return (
              <Hb.Box
                key={entry.serviceType}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Hb.Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    bgcolor: `${color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Hb.Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: color,
                    }}
                  />
                </Hb.Box>
                <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
                  <Hb.Text variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                    {SERVICE_LABEL_MAP[entry.serviceType] ?? entry.serviceType}
                  </Hb.Text>
                  <Hb.Text
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {entry.count.toLocaleString()} · {pct.toFixed(1)}%
                  </Hb.Text>
                </Hb.Box>
              </Hb.Box>
            );
          })}
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
  );
};
