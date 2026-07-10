import { describe, it, expect } from "vitest";
import type { IssueType } from "@/entities/issue";
import type { SprintType } from "@/entities/sprint";
import { groupIssuesBySprint } from "./backlog-group.lib";

const makeSprint = (id: string, status = "ACTIVE"): SprintType =>
  ({ id, name: `Sprint ${id}`, status }) as SprintType;

const makeIssue = (id: string, sprint?: string): IssueType =>
  ({
    id,
    sprint,
    type: "TASK",
    status: "TODO",
    priority: "MEDIUM",
  }) as IssueType;

describe("groupIssuesBySprint", () => {
  it("이슈를 스프린트별로 그룹화한다", () => {
    const sprints = [makeSprint("s1"), makeSprint("s2")];
    const issues = [makeIssue("i1", "s1"), makeIssue("i2", "s2"), makeIssue("i3", "s1")];

    const result = groupIssuesBySprint(issues, sprints);

    expect(result.sprintGroups[0]?.issues).toHaveLength(2);
    expect(result.sprintGroups[1]?.issues).toHaveLength(1);
    expect(result.backlogIssues).toHaveLength(0);
  });

  it("스프린트가 없는 이슈는 백로그로 분류한다", () => {
    const sprints = [makeSprint("s1")];
    const issues = [makeIssue("i1"), makeIssue("i2", "s1")];

    const result = groupIssuesBySprint(issues, sprints);

    expect(result.backlogIssues).toHaveLength(1);
    expect(result.backlogIssues[0]?.id).toBe("i1");
  });

  it("존재하지 않는 스프린트를 참조하는 이슈는 백로그로 분류한다", () => {
    const sprints = [makeSprint("s1")];
    const issues = [makeIssue("i1", "deleted-sprint")];

    const result = groupIssuesBySprint(issues, sprints);

    expect(result.backlogIssues).toHaveLength(1);
    expect(result.sprintGroups[0]?.issues).toHaveLength(0);
  });

  it("이슈와 스프린트가 모두 비어있으면 빈 결과를 반환한다", () => {
    const result = groupIssuesBySprint([], []);

    expect(result.sprintGroups).toHaveLength(0);
    expect(result.backlogIssues).toHaveLength(0);
  });

  it("스프린트 순서를 유지한다", () => {
    const sprints = [makeSprint("s2"), makeSprint("s1")];
    const issues = [makeIssue("i1", "s1")];

    const result = groupIssuesBySprint(issues, sprints);

    expect(result.sprintGroups[0]?.sprint.id).toBe("s2");
    expect(result.sprintGroups[1]?.sprint.id).toBe("s1");
    expect(result.sprintGroups[1]?.issues).toHaveLength(1);
  });
});
