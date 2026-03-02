import { useSuspenseQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  dashboardQueries,
  KpiCard,
  type PeriodType,
} from "@/entities/dashboard";
import { StickyNote2Outlined, Checklist } from "@mui/icons-material";
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
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <NoteCreationAreaChart data={d.dailyCreated} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <NoteStatusPieChart data={d.byStatus} />
        </Paper>
      </Grid>

      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{ p: 2.5, border: "1px solid", borderColor: "divider" }}
        >
          <LabelBarChart data={d.byLabel} />
        </Paper>
      </Grid>
    </Grid>
  );
};
