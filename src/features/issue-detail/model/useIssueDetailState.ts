import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProjectContext } from "@/shared/model";
import {
  issueQueries,
  buildIssueTree,
  getDescendantProgress,
  isDescendantOf,
  PARENT_ISSUE_KINDS,
} from "@/entities/issue";
import { sprintQueries } from "@/entities/sprint";
import { userQueries } from "@/entities/user";

export const useIssueDetailState = (
  projectId: string,
  issueId: string | null,
  enabled: boolean,
) => {
  const { doneStatusIds } = useProjectContext();

  const { data: issueData } = useQuery({
    ...issueQueries.listByProject(projectId),
    enabled,
  });
  const { data: sprintData } = useQuery({
    ...sprintQueries.listByProject(projectId),
    enabled,
  });
  const { data: userData } = useQuery({
    ...userQueries.me(),
    enabled,
  });

  const issue = issueData?.items.find((i) => i.id === issueId);

  const activeSprints = useMemo(
    () => (sprintData?.items ?? []).filter((s) => s.status !== "CLOSED"),
    [sprintData],
  );

  const issueTree = useMemo(
    () => (issueData ? buildIssueTree(issueData.items) : null),
    [issueData],
  );

  const parentIssue = issue ? issueTree?.parentMap.get(issue.id) : undefined;
  const childIssues = issue ? (issueTree?.childrenMap.get(issue.id) ?? []) : [];

  const availableParents = useMemo(() => {
    if (!issueData || !issue || !issueTree) return [];
    return issueData.items.filter((candidate) => {
      if (!PARENT_ISSUE_KINDS.has(candidate.type)) return false;
      if (candidate.id === issue.id) return false;
      if (isDescendantOf(candidate.id, issue.id, issueTree.parentMap))
        return false;
      return true;
    });
  }, [issueData, issue, issueTree]);

  const progress =
    issue && issueTree
      ? getDescendantProgress(issue.id, issueTree.childrenMap, doneStatusIds)
      : null;

  const currentUserId = userData?.items?.id ?? "";

  return {
    issue,
    parentIssue,
    childIssues,
    availableParents,
    progress,
    activeSprints,
    currentUserId,
  };
};
