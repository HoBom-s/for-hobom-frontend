import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import type { StatusCodeSummary } from "@/entities/analytics";

interface StatusCodeChartProps {
  data: StatusCodeSummary[];
}

const STATUS_COLOR: Record<string, string> = {
  "2": "#34d399",
  "3": "#60a5fa",
  "4": "#fbbf24",
  "5": "#f87171",
};

const getColor = (statusCodeClass: number) =>
  STATUS_COLOR[String(statusCodeClass).charAt(0)] ?? "#94a3b8";

export const StatusCodeChart = ({ data }: StatusCodeChartProps) => {
  const chartData = data.map((d) => ({
    name: `${d.statusCodeClass}xx`,
    value: d.totalCount,
    fill: getColor(d.statusCodeClass),
  }));

  return (
    <DashboardPaper>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        Status Code Distribution
      </Hb.Text>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </DashboardPaper>
  );
};
