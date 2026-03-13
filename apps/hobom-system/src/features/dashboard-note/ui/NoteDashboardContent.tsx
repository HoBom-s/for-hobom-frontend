import { useSuspenseQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import { StickyNote2Outlined, Checklist } from "@mui/icons-material";
import {
  DashboardPaper,
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import { NoteStatusPieChart } from "./NoteStatusPieChart";
import { LabelBarChart } from "./LabelBarChart";
import { NoteCreationAreaChart } from "./NoteCreationAreaChart";

interface NoteDashboardContentProps {
  period: PeriodType;
  date: string;
}

export const NoteDashboardContent = ({
  period,
  date,
}: NoteDashboardContentProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.notes(period, date));
  const d = data.items;

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <KpiCard
          label="총 노트"
          value={d.overview.total}
          suffix="개"
          icon={<StickyNote2Outlined fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <KpiCard
          label="체크리스트 완료율"
          value={Math.round(d.overview.checklistCompletionRate * 100)}
          suffix="%"
          icon={<Checklist fontSize="small" />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <DashboardPaper>
          <NoteCreationAreaChart data={d.dailyCreated} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <NoteStatusPieChart data={d.byStatus} />
        </DashboardPaper>
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <LabelBarChart data={d.byLabel} />
        </DashboardPaper>
      </Grid>
    </Grid>
  );
};
