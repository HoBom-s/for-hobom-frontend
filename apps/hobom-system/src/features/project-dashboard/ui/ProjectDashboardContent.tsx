import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import { dashboardQueries } from "@/entities/dashboard";
import { sprintQueries } from "@/entities/sprint";
import { useProjectContext } from "@/shared/model";
import { Hb } from "@/shared/ui";
import { IssueDashboardSection } from "./IssueDashboardSection";
import { SprintDashboardSection } from "./SprintDashboardSection";

export const ProjectDashboardContent = () => {
  const { projectId } = useProjectContext();
  const { data: issueData } = useSuspenseQuery(dashboardQueries.projectIssues(projectId));
  const { data: sprintsData } = useSuspenseQuery(sprintQueries.listByProject(projectId));

  const sprints = sprintsData.items;
  const [selectedSprintId, setSelectedSprintId] = useState<string>("");

  return (
    <Hb.Box>
      <Hb.Text variant="h6" fontWeight={700} sx={{ mb: 2.5 }}>
        이슈 개요
      </Hb.Text>
      <IssueDashboardSection data={issueData.items} />

      <Hb.Divider sx={{ my: 3 }} />

      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
        }}
      >
        <Hb.Text variant="h6" fontWeight={700}>
          스프린트 대시보드
        </Hb.Text>
        <Hb.Form.Control size="small" sx={{ minWidth: 200 }}>
          <Hb.Form.Label>스프린트 선택</Hb.Form.Label>
          <Hb.Form.Select
            value={selectedSprintId}
            label="스프린트 선택"
            onChange={(e) => setSelectedSprintId(e.target.value)}
          >
            {sprints.map((s) => (
              <Hb.Menu.Item key={s.id} value={s.id}>
                {s.name}
              </Hb.Menu.Item>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
      </Hb.Box>

      {selectedSprintId ? (
        <SprintDashboardSection projectId={projectId} sprintId={selectedSprintId} />
      ) : (
        <Hb.Text variant="body2" color="text.secondary">
          스프린트를 선택하면 상세 대시보드를 확인할 수 있습니다.
        </Hb.Text>
      )}
    </Hb.Box>
  );
};
