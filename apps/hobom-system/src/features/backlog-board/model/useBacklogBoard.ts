import { useMemo } from "react";
import { useSuspenseQueries } from "hobom-data";
import { issueQueries } from "@/entities/issue";
import { sprintQueries } from "@/entities/sprint";
import { groupIssuesBySprint } from "../lib/backlog-group.lib";

export const useBacklogBoard = (projectId: string) => {
  const [{ data: issueData }, { data: sprintData }] = useSuspenseQueries({
    queries: [issueQueries.listByProject(projectId), sprintQueries.listByProject(projectId)],
  });

  const sprints = sprintData.items;
  const issues = issueData.items;

  const { sprintGroups, backlogIssues } = useMemo(
    () => groupIssuesBySprint(issues, sprints),
    [issues, sprints],
  );

  return { sprints, sprintGroups, backlogIssues };
};
