import { useSuspenseQuery } from "hobom-data";
import { StickyNote2Outlined, Checklist } from "hobom-design-system/icons";
import { DashboardPaper, dashboardQueries, KpiCard, type PeriodType } from "@/entities/dashboard";
import { Hb } from "@/shared/ui";
import { NoteStatusPieChart } from "./NoteStatusPieChart";
import { LabelBarChart } from "./LabelBarChart";
import { NoteCreationAreaChart } from "./NoteCreationAreaChart";

interface NoteDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const NoteDashboardContent = ({ period, date }: NoteDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.notes(period, date));
  const d = data.items;

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 6 }}>
        <KpiCard
          label="총 노트"
          value={d.overview.total}
          suffix="개"
          icon={<StickyNote2Outlined fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6 }}>
        <KpiCard
          label="체크리스트 완료율"
          value={Math.round(d.overview.checklistCompletionRate * 100)}
          suffix="%"
          icon={<Checklist fontSize="small" />}
        />
      </Hb.Grid>

      <Hb.Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <NoteCreationAreaChart data={d.dailyCreated} />
        </DashboardPaper>
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <NoteStatusPieChart data={d.byStatus} />
        </DashboardPaper>
      </Hb.Grid>

      <Hb.Grid size={12}>
        <DashboardPaper>
          <LabelBarChart data={d.byLabel} />
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};
