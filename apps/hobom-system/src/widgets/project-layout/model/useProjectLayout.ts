import { useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSuspenseQueries } from "hobom-data";
import {
  projectQueries,
  buildStatusesFromColumns,
  buildTransitionsFromColumns,
  getDoneStatusIds,
} from "@/entities/project";
import { boardQueries, DEFAULT_BOARD_COLUMNS } from "@/entities/board";
import { assertCondition } from "@/shared/lib";

const TABS = [
  { label: "보드", path: "board" },
  { label: "백로그", path: "backlog" },
  { label: "이슈", path: "issues" },
  { label: "대시보드", path: "dashboard" },
  { label: "설정", path: "settings" },
] as const;

const TABS_WITH_ISSUE_BUTTON = new Set(["board", "backlog", "issues"]);

export { TABS };

export const useProjectLayout = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  assertCondition(projectId, "projectId is required in route params");

  const [{ data }, { data: boardsData }] = useSuspenseQueries({
    queries: [projectQueries.detail(projectId), boardQueries.listByProject(projectId)],
  });
  const project = data.items;

  const projectCtx = useMemo(() => {
    const kanban = boardsData.items.find((b) => b.type === "KANBAN");
    const boardColumns = kanban?.columns?.length ? kanban.columns : DEFAULT_BOARD_COLUMNS;
    const workflow = project.workflow;
    const statuses = workflow?.statuses ?? buildStatusesFromColumns(boardColumns);
    const transitions = workflow?.transitions ?? buildTransitionsFromColumns(boardColumns);

    return {
      projectId,
      statuses,
      transitions,
      doneStatusIds: getDoneStatusIds(statuses),
    };
  }, [projectId, project.workflow, boardsData]);

  const currentPath = TABS.find((t) => location.pathname.includes(`/${t.path}`))?.path;

  const showIssueButton = TABS_WITH_ISSUE_BUTTON.has(currentPath ?? "");
  const showSprintButton = currentPath === "backlog";

  const handleNavigateToProjects = useCallback(() => {
    navigate("/projects");
  }, [navigate]);

  const handleNavigateToTab = useCallback(
    (tabPath: string) => {
      navigate(`/projects/${projectId}/${tabPath}`);
    },
    [navigate, projectId],
  );

  return {
    projectId,
    project,
    projectCtx,
    currentPath,
    showIssueButton,
    showSprintButton,
    handleNavigateToProjects,
    handleNavigateToTab,
  };
};
