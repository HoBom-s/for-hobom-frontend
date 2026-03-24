import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import type { ErrorDistributionEntry } from "@/entities/analytics";

interface ErrorDistributionChartProps {
  data: ErrorDistributionEntry[];
}

const COLORS = ["#f87171", "#fb923c", "#fbbf24", "#a78bfa", "#60a5fa", "#34d399"];

export const ErrorDistributionChart = ({ data }: ErrorDistributionChartProps) => {
  return (
    <DashboardPaper>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        Error Type Distribution
      </Hb.Text>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="key"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </DashboardPaper>
  );
};
