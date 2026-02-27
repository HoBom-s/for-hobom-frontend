import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface NoteStatusPieChartProps {
  data: { status: string; count: number }[];
}

const COLORS = ["#4680ff", "#2ca87f", "#e58a00", "#dc2626"];

export const NoteStatusPieChart = ({ data }: NoteStatusPieChartProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        노트 상태 분포
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
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
