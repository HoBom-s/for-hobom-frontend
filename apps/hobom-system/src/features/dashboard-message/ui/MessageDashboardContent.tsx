import { useSuspenseQuery } from "@tanstack/react-query";
import { Mail, Send, HourglassEmpty } from "hobom-design-system/icons";
import { DashboardPaper, dashboardQueries, KpiCard, type PeriodType } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";
import { UpcomingMessageTimeline } from "./UpcomingMessageTimeline";
import { MonthlySentBarChart } from "./MonthlySentBarChart";

interface MessageDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const MessageDashboardContent = ({ period, date }: MessageDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.messages(period, date));
  const d = data.items;

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="총 메시지"
          value={d.overview.total}
          suffix="개"
          icon={<Mail fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="발송 완료"
          value={d.overview.sent}
          suffix="개"
          icon={<Send fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 4 }}>
        <KpiCard
          label="대기 중"
          value={d.overview.pending}
          suffix="개"
          icon={<HourglassEmpty fontSize="small" />}
        />
      </Hb.Grid>

      <Hb.Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <MonthlySentBarChart data={d.monthlyTrend} />
        </DashboardPaper>
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <UpcomingMessageTimeline data={d.upcoming} />
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};
