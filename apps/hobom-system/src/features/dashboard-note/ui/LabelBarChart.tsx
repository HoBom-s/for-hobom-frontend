import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Hb } from "@/shared/ui";

interface LabelBarChartProps {
  data: { labelId: string; count: number }[];
}

export const LabelBarChart = ({ data }: LabelBarChartProps) => {
  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        라벨별 노트 수
      </Hb.Text>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" barSize={20}>
          <defs>
            <linearGradient id="labelBarBlue" x1="0" y1="0" x2="1" y2="0">
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
            dataKey="labelId"
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
          <Bar dataKey="count" name="노트 수" fill="url(#labelBarBlue)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Hb.Box>
  );
};
