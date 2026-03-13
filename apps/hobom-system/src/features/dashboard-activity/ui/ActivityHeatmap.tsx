import { Hb } from "@/shared/ui";

interface HeatmapData {
  date: string;
  count: number;
  level: number;
}

interface ActivityHeatmapProps {
  data: HeatmapData[];
}

const LEVEL_COLORS = [
  "#ebedf0",
  "#c6e48b",
  "#7bc96f",
  "#239a3b",
  "#196127",
] as const;

const WEEKS = 20;
const DAYS_PER_WEEK = 7;

export const ActivityHeatmap = ({ data }: ActivityHeatmapProps) => {
  const dataMap = new Map(data.map((d) => [d.date, d]));

  const today = new Date();
  const cells: { date: string; level: number; count: number }[] = [];

  for (let i = WEEKS * DAYS_PER_WEEK - 1; i >= 0; i--) {
    const d = new Date(today);

    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const entry = dataMap.get(dateStr);

    cells.push({
      date: dateStr,
      level: entry?.level ?? 0,
      count: entry?.count ?? 0,
    });
  }

  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
        활동 히트맵
      </Hb.Text>
      <Hb.Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${WEEKS}, 14px)`,
          gridTemplateRows: `repeat(${DAYS_PER_WEEK}, 14px)`,
          gap: "3px",
          gridAutoFlow: "column",
        }}
      >
        {cells.map((cell) => (
          <Hb.Tooltip
            key={cell.date}
            title={`${cell.date}: ${cell.count}건`}
            arrow
            placement="top"
          >
            <Hb.Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: "2px",
                bgcolor: LEVEL_COLORS[cell.level],
              }}
            />
          </Hb.Tooltip>
        ))}
      </Hb.Box>
    </Hb.Box>
  );
};
