import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { dashboardQueries } from "@/entities/dashboard";
import { sprintQueries } from "@/entities/sprint";
import { useProjectContext } from "@/shared/model";
import { IssueDashboardSection } from "./IssueDashboardSection";
import { SprintDashboardSection } from "./SprintDashboardSection";

export const ProjectDashboardContent = () => {
  const { projectId } = useProjectContext();
  const { data: issueData } = useSuspenseQuery(
    dashboardQueries.projectIssues(projectId),
  );
  const { data: sprintsData } = useSuspenseQuery(
    sprintQueries.listByProject(projectId),
  );

  const sprints = sprintsData.items;
  const [selectedSprintId, setSelectedSprintId] = useState<string>("");

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>
        이슈 개요
      </Typography>
      <IssueDashboardSection data={issueData.items} />

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          스프린트 대시보드
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>스프린트 선택</InputLabel>
          <Select
            value={selectedSprintId}
            label="스프린트 선택"
            onChange={(e) => setSelectedSprintId(e.target.value)}
          >
            {sprints.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedSprintId ? (
        <SprintDashboardSection
          projectId={projectId}
          sprintId={selectedSprintId}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          스프린트를 선택하면 상세 대시보드를 확인할 수 있습니다.
        </Typography>
      )}
    </Box>
  );
};
