import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_COLORS } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";

interface CategoryDonutChartProps {
  data: {
    categoryId: string;
    categoryTitle: string;
    total: number;
    completed: number;
  }[];
}

export const CategoryDonutChart = ({ data }: CategoryDonutChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        카테고리별 분포
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="categoryTitle"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
