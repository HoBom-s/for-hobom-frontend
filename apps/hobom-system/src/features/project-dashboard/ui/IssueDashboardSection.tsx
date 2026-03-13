import Grid from "@mui/material/Grid";
import { Box, LinearProgress, Typography } from "@mui/material";
import {
  FormatListNumbered,
  ErrorOutline,
  CheckCircleOutline,
  WarningAmberOutlined,
} from "@mui/icons-material";
import {
  DashboardPaper,
  KpiCard,
  type ProjectIssueDashboardDto,
} from "@/entities/dashboard";
import { StatusDistributionChart } from "./StatusDistributionChart";
import { PriorityDistributionChart } from "./PriorityDistributionChart";
import { TypeDistributionChart } from "./TypeDistributionChart";

interface IssueDashboardSectionProps {
  data: ProjectIssueDashboardDto;
}

export const IssueDashboardSection = ({ data }: IssueDashboardSectionProps) => {
  const { overview } = data;
  const completionPercent = Math.round(overview.completionRate * 100);

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="총 이슈"
          value={overview.total}
          suffix="개"
          icon={<FormatListNumbered fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="열린 이슈"
          value={overview.open}
          suffix="개"
          icon={<ErrorOutline fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="완료"
          value={overview.done}
          suffix="개"
          icon={<CheckCircleOutline fontSize="small" />}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          label="지연 이슈"
          value={overview.overdueCount}
          suffix="개"
          icon={<WarningAmberOutlined fontSize="small" />}
        />
      </Grid>

      <Grid size={12}>
        <DashboardPaper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              완료율
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {completionPercent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completionPercent}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": { borderRadius: 5 },
            }}
          />
        </DashboardPaper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <StatusDistributionChart data={data.byStatus} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <PriorityDistributionChart data={data.byPriority} />
        </DashboardPaper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardPaper>
          <TypeDistributionChart data={data.byType} />
        </DashboardPaper>
      </Grid>
    </Grid>
  );
};
