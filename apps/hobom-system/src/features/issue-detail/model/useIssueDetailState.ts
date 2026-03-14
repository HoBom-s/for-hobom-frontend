import { useMemo } from "react";
import { useQuery } from "hobom-data";
import { useProjectContext } from "@/shared/model";
import {
  issueQueries,
  buildIssueTree,
  getDescendantProgress,
  isDescendantOf,
  PARENT_ISSUE_KINDS,
} from "@/entities/issue";
import { projectQueries } from "@/entities/project";
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
  const { data: projectData } = useQuery({
    ...projectQueries.detail(projectId),
    enabled,
  });
  const { data: usersData } = useQuery({
    ...userQueries.list(),
    enabled,
  });

  const issue = issueData?.items.find((i) => i.id === issueId);

  const activeSprints = useMemo(
    () => (sprintData?.items ?? []).filter((s) => s.status !== "COMPLETED"),
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
      if (isDescendantOf(candidate.id, issue.id, issueTree.parentMap)) {
        return false;
      }

      return true;
    });
  }, [issueData, issue, issueTree]);

  const progress =
    issue && issueTree
      ? getDescendantProgress(issue.id, issueTree.childrenMap, doneStatusIds)
      : null;

  const currentUserId = userData?.id ?? "";

  const projectMembers = useMemo(() => {
    if (!projectData || !usersData) return [];
    const userMap = new Map(usersData.items.map((u) => [u.id, u]));

    return projectData.items.members.map((m) => ({
      userId: m.userId,
      nickname: userMap.get(m.userId)?.nickname ?? m.userId,
    }));
  }, [projectData, usersData]);

  return {
    issue,
    parentIssue,
    childIssues,
    availableParents,
    progress,
    activeSprints,
    currentUserId,
    projectMembers,
  };
};
