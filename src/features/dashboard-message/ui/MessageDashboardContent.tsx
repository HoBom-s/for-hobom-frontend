import { useSuspenseQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import { Mail, Send, HourglassEmpty } from "@mui/icons-material";
import { UpcomingMessageTimeline } from "./UpcomingMessageTimeline";
import { MonthlySentBarChart } from "./MonthlySentBarChart";

interface MessageDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const MessageDashboardContent = ({
  period,
  date,
}: MessageDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.messages(period, date));
  const d = data.items;

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="총 메시지"
          value={d.overview.total}
          suffix="개"
          icon={<Mail fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="발송 완료"
          value={d.overview.sent}
          suffix="개"
          icon={<Send fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="대기 중"
          value={d.overview.pending}
          suffix="개"
          icon={<HourglassEmpty fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <MonthlySentBarChart data={d.monthlyTrend} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <UpcomingMessageTimeline data={d.upcoming} />
        </Paper>
      </Grid>
    </Grid>
  );
};
