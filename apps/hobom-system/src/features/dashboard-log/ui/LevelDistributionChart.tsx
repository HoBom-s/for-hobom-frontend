import { Box, Typography, LinearProgress } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { LogLevelCount } from "@/entities/log";

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

export const LevelDistributionChart = ({
  data,
}: LevelDistributionChartProps) => {
  const sorted = [...data].sort(
    (a, b) => levelIndex(a.level) - levelIndex(b.level),
  );
  const total = sorted.reduce((sum, d) => sum + d.count, 0);

  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        로그 레벨 분포
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
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
                <Cell
                  key={entry.level}
                  fill={LEVEL_COLORS[entry.level] ?? "#94baff"}
                />
              ))}
            </Pie>
            <Tooltip
              // @ts-expect-error recharts formatter type mismatch
              formatter={(value: number, name: string) => [
                value.toLocaleString(),
                name,
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
              전체
            </text>
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          {sorted.map((entry) => {
            const pct = total > 0 ? (entry.count / total) * 100 : 0;
            const color = LEVEL_COLORS[entry.level] ?? "#94baff";

            return (
              <Box key={entry.level}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 0.25,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: 12 }}
                    >
                      {entry.level}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {entry.count.toLocaleString()} ({pct.toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "grey.100",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 2,
                      bgcolor: color,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
