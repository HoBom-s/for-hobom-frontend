import { Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import {
  FormatListNumbered,
  CheckCircleOutline,
  TrendingUp,
  DataUsageOutlined,
} from "hobom-design-system/icons";
import { DashboardPaper, dashboardQueries, KpiCard } from "@/entities/dashboard";
import { Hb, SuspenseLoader } from "@/shared/ui";

interface SprintDashboardSectionProps {
  projectId: string;
  sprintId: string;
}

const SprintDashboardInner = ({ projectId, sprintId }: SprintDashboardSectionProps) => {
  const { data } = useSuspenseQuery(dashboardQueries.sprint(projectId, sprintId));
  const { sprint, overview } = data.items;
  const completionPercent = Math.round(overview.completionRate * 100);

  return (
    <Hb.Grid container spacing={2.5}>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 이슈"
          value={overview.totalIssues}
          suffix="개"
          icon={<FormatListNumbered fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료"
          value={overview.completedIssues}
          suffix="개"
          icon={<CheckCircleOutline fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료율"
          value={completionPercent}
          suffix="%"
          icon={<TrendingUp fontSize="small" />}
        />
      </Hb.Grid>
      <Hb.Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="스토리포인트"
          value={`${overview.completedStoryPoints}/${overview.totalStoryPoints}`}
          aria-label="SP"
          icon={<DataUsageOutlined fontSize="small" />}
        />
      </Hb.Grid>

      <Hb.Grid size={12}>
        <DashboardPaper>
          <Hb.Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <Hb.Text variant="subtitle1" fontWeight={700}>
              {sprint.name}
            </Hb.Text>
            <Hb.Chip label={sprint.status} size="small" variant="outlined" />
          </Hb.Box>
          <Hb.Text variant="body2" color="text.secondary">
            {sprint.startDate} ~ {sprint.endDate}
          </Hb.Text>
          {sprint.goal && (
            <Hb.Text variant="body2" sx={{ mt: 1 }}>
              목표: {sprint.goal}
            </Hb.Text>
          )}
        </DashboardPaper>
      </Hb.Grid>
    </Hb.Grid>
  );
};

export const SprintDashboardSection = (props: SprintDashboardSectionProps) => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <SprintDashboardInner {...props} />
    </Suspense>
  );
};
