import { useSuspenseQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import { Notifications, DoneAll, MarkEmailUnread } from "@mui/icons-material";
import { ReadUnreadStackedBar } from "./ReadUnreadStackedBar";
import { UnreadAlertList } from "./UnreadAlertList";
import { NotificationCategoryDonut } from "./NotificationCategoryDonut";

interface NotificationDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const NotificationDashboardContent = ({
  period,
  date,
}: NotificationDashboardContentProps) => {
  const { data } = useSuspenseQuery(
    dashboardQueries.notifications(period, date),
  );
  const d = data.items;

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="총 알림"
          value={d.overview.total}
          suffix="개"
          icon={<Notifications fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="읽음"
          value={d.overview.read}
          suffix="개"
          icon={<DoneAll fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="안읽음"
          value={d.overview.unread}
          suffix="개"
          icon={<MarkEmailUnread fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <ReadUnreadStackedBar data={d.dailyTrend} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <NotificationCategoryDonut data={d.byCategory} />
        </Paper>
      </Grid>

      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <UnreadAlertList data={d.recentUnread} />
        </Paper>
      </Grid>
    </Grid>
  );
};
