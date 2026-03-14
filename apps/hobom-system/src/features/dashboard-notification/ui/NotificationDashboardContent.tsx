import { useSuspenseQuery } from "@tanstack/react-query";
import { Notifications, DoneAll, MarkEmailUnread } from "hobom-design-system/icons";
import { DashboardPaper, dashboardQueries, KpiCard, type PeriodType } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";
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
  const { data } = useSuspenseQuery(dashboardQueries.notifications(period, date));
  const d = data.items;

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="총 알림"
          value={d.overview.total}
          suffix="개"
          icon={<Notifications fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="읽음"
          value={d.overview.read}
          suffix="개"
          icon={<DoneAll fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="안읽음"
          value={d.overview.unread}
          suffix="개"
          icon={<MarkEmailUnread fontSize="small" />}
        />
      </Hb.Grid>

      <Hb.Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <ReadUnreadStackedBar data={d.dailyTrend} />
        </DashboardPaper>
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <NotificationCategoryDonut data={d.byCategory} />
        </DashboardPaper>
      </Hb.Grid>

      <Hb.Grid size={12}>
        <DashboardPaper>
          <UnreadAlertList data={d.recentUnread} />
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};
