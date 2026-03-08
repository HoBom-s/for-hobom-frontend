import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ProjectIssueDashboardDto } from "@/entities/dashboard";

interface PriorityDistributionChartProps {
  data: ProjectIssueDashboardDto["byPriority"];
}

export const PriorityDistributionChart = ({
  data,
}: PriorityDistributionChartProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        우선순위별 분포
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" barSize={20}>
          <defs>
            <linearGradient
              id="priorityBarGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#4680ff" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#4680ff" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} stroke="#f0f0f0" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#8c8c8c" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="priority"
            tick={{ fontSize: 11, fill: "#5a6a85" }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            cursor={{ fill: "rgba(70,128,255,0.06)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: 13,
            }}
          />
          <Bar
            dataKey="count"
            name="이슈 수"
            fill="url(#priorityBarGradient)"
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
