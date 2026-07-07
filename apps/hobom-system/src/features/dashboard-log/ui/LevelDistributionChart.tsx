import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { LogLevelCount } from "@/entities/log";
import { Hb } from "@/shared/ui";

const LEVEL_COLORS: Record<string, string> = {
  DEBUG: "#22d3ee",
  INFO: "#818cf8",
  WARN: "#fbbf24",
  ERROR: "#f87171",
  FATAL: "#f472b6",
};

const LEVEL_ORDER = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"];

const levelIndex = (l: string) => {
  const idx = LEVEL_ORDER.indexOf(l);

  return idx >= 0 ? idx : LEVEL_ORDER.length;
};

interface LevelDistributionChartProps {
  data: LogLevelCount[];
}

export const LevelDistributionChart = ({ data }: LevelDistributionChartProps) => {
  const sorted = [...data].sort((a, b) => levelIndex(a.level) - levelIndex(b.level));
  const total = sorted.reduce((sum, d) => sum + d.count, 0);

  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        로그 레벨 분포
      </Hb.Text>
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={sorted}
              dataKey="count"
              nameKey="level"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={45}
              strokeWidth={2}
              stroke="#fff"
              animationBegin={0}
              animationDuration={800}
            >
              {sorted.map((entry) => (
                <Cell key={entry.level} fill={LEVEL_COLORS[entry.level] ?? "#94baff"} />
              ))}
            </Pie>
            <Tooltip
              // @ts-expect-error recharts formatter type mismatch
              formatter={(value: number, name: string) => [value.toLocaleString(), name]}
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
              전체
            </text>
          </PieChart>
        </ResponsiveContainer>
        <Hb.Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {sorted.map((entry) => {
            const pct = total > 0 ? (entry.count / total) * 100 : 0;
            const color = LEVEL_COLORS[entry.level] ?? "#94baff";

            return (
              <Hb.Box key={entry.level}>
                <Hb.Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Hb.Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Hb.Box
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: color,
                        flexShrink: 0,
                      }}
                    />
                    <Hb.Text
                      variant="body2"
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    >
                      {entry.level}
                    </Hb.Text>
                  </Hb.Box>
                  <Hb.Text
                    variant="caption"
                    style={{
                      color: "var(--hb-color-text-secondary)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {entry.count.toLocaleString()} ({pct.toFixed(1)}%)
                  </Hb.Text>
                </Hb.Box>
                <Hb.Progress.Linear
                  variant="determinate"
                  value={pct}
                  color={color}
                  style={{ height: 4, borderRadius: 16, backgroundColor: "#f5f5f5" }}
                />
              </Hb.Box>
            );
          })}
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
  );
};
