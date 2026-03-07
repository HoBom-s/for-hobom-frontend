import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { issueQueries } from "@/entities/issue";
import { sprintQueries } from "@/entities/sprint";
import { groupIssuesBySprint } from "../lib/backlog-group.lib";

export const useBacklogBoard = (projectId: string) => {
  const { data: issueData } = useSuspenseQuery(
    issueQueries.listByProject(projectId),
  );
  const { data: sprintData } = useSuspenseQuery(
    sprintQueries.listByProject(projectId),
  );

  const sprints = sprintData.items;
  const issues = issueData.items;

  const { sprintGroups, backlogIssues } = useMemo(
    () => groupIssuesBySprint(issues, sprints),
    [issues, sprints],
  );

  return { sprints, sprintGroups, backlogIssues };
};
