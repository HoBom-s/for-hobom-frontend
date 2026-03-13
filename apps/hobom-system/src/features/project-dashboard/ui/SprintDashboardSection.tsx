import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import { Box, Chip, Typography } from "@mui/material";
import {
  FormatListNumbered,
  CheckCircleOutline,
  TrendingUp,
  DataUsageOutlined,
} from "@mui/icons-material";
import {
  DashboardPaper,
  dashboardQueries,
  KpiCard,
} from "@/entities/dashboard";
import { SuspenseLoader } from "@/shared/ui";

interface SprintDashboardSectionProps {
  projectId: string;
  sprintId: string;
}

const SprintDashboardInner = ({
  projectId,
  sprintId,
}: SprintDashboardSectionProps) => {
  const { data } = useSuspenseQuery(
    dashboardQueries.sprint(projectId, sprintId),
  );
  const { sprint, overview } = data.items;
  const completionPercent = Math.round(overview.completionRate * 100);

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 이슈"
          value={overview.totalIssues}
          suffix="개"
          icon={<FormatListNumbered fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료"
          value={overview.completedIssues}
          suffix="개"
          icon={<CheckCircleOutline fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료율"
          value={completionPercent}
          suffix="%"
          icon={<TrendingUp fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="스토리포인트"
          value={`${overview.completedStoryPoints}/${overview.totalStoryPoints}`}
          aria-label="SP"
          icon={<DataUsageOutlined fontSize="small" />}
        />
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              {sprint.name}
            </Typography>
            <Chip label={sprint.status} size="small" variant="outlined" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {sprint.startDate} ~ {sprint.endDate}
          </Typography>
          {sprint.goal && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              목표: {sprint.goal}
            </Typography>
          )}
        </DashboardPaper>
      </Grid>
    </Grid>
  );
};

export const SprintDashboardSection = (props: SprintDashboardSectionProps) => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <SprintDashboardInner {...props} />
    </Suspense>
  );
};
