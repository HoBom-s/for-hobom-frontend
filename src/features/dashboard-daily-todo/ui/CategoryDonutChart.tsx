import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CategoryDonutChartProps {
  data: {
    categoryId: string;
    categoryTitle: string;
    total: number;
    completed: number;
  }[];
}

const COLORS = [
  "#4680ff",
  "#2ca87f",
  "#e58a00",
  "#dc2626",
  "#5b6a98",
  "#94baff",
];

export const CategoryDonutChart = ({ data }: CategoryDonutChartProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        카테고리별 분포
      </Typography>
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
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
