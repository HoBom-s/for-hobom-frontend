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

interface NoteCreationAreaChartProps {
  data: { date: string; count: number }[];
}

export const NoteCreationAreaChart = ({ data }: NoteCreationAreaChartProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        일별 노트 생성 추이
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: string) => v.slice(5)}
          />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            name="생성 수"
            stroke="#4680ff"
            fill="#4680ff"
            fillOpacity={0.15}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
