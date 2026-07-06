import { Bom } from "hobom-utils";
import type { IssueType } from "@/entities/issue";
import type { SprintType } from "@/entities/sprint";

interface SprintGroup {
  sprint: SprintType;
  issues: IssueType[];
}

export const groupIssuesBySprint = (
  issues: IssueType[],
  sprints: SprintType[],
): { sprintGroups: SprintGroup[]; backlogIssues: IssueType[] } => {
  const sprintIds = new Set(sprints.map((s) => s.id));

  const isSprintIssue = (issue: IssueType): issue is IssueType & { sprint: string } =>
    !!issue.sprint && sprintIds.has(issue.sprint);

  const [sprintIssues, backlogIssues] = Bom.pipe(issues, Bom.partition(isSprintIssue));

  const grouped = Bom.pipe(
    sprintIssues,
    Bom.groupBy((i) => i.sprint),
  );

  const sprintGroups = sprints.map((sprint) => ({
    sprint,
    issues: grouped[sprint.id] ?? [],
  }));

  return { sprintGroups, backlogIssues };
};
