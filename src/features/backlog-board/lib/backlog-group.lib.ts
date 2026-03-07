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
  const issuesBySprint = new Map<string, IssueType[]>();
  const backlog: IssueType[] = [];

  for (const issue of issues) {
    if (issue.sprint && sprintIds.has(issue.sprint)) {
      const list = issuesBySprint.get(issue.sprint);
      if (list) list.push(issue);
      else issuesBySprint.set(issue.sprint, [issue]);
    } else {
      backlog.push(issue);
    }
  }

  const groups = sprints.map((sprint) => ({
    sprint,
    issues: issuesBySprint.get(sprint.id) ?? [],
  }));

  return { sprintGroups: groups, backlogIssues: backlog };
};
