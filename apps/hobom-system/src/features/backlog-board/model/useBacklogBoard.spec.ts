// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IssueType } from "@/entities/issue";

const useSuspenseQueriesMock = vi.fn();
const groupIssuesBySprintMock = vi.fn();

vi.mock("hobom-data", () => ({
  useSuspenseQueries: (opts: unknown) => useSuspenseQueriesMock(opts),
}));

vi.mock("@/entities/issue", () => ({
  issueQueries: {
    listByProject: (projectId: string) => ({
      queryKey: ["issues", "list", projectId],
    }),
  },
}));

vi.mock("@/entities/sprint", () => ({
  sprintQueries: {
    listByProject: (projectId: string) => ({
      queryKey: ["sprints", "list", projectId],
    }),
  },
}));

vi.mock("../lib/backlog-group.lib", () => ({
  groupIssuesBySprint: (...args: unknown[]) => groupIssuesBySprintMock(...args),
}));

const { useBacklogBoard } = await import("./useBacklogBoard");

const makeIssue = (id: string, sprint?: string): IssueType =>
  ({
    id,
    project: "proj-1",
    issueNumber: 1,
    issueKey: `PROJ-${id}`,
    type: "TASK",
    title: `이슈 ${id}`,
    status: "todo",
    priority: "MEDIUM",
    reporter: "user-1",
    labels: [],
    sprint,
  }) as IssueType;

const makeSprint = (id: string) => ({
  id,
  project: "proj-1",
  name: `스프린트 ${id}`,
  status: "ACTIVE",
  startDate: "2026-03-01",
  endDate: "2026-03-15",
  createdBy: "user-1",
});

describe("useBacklogBoard", () => {
  beforeEach(() => {
    useSuspenseQueriesMock.mockReset();
    groupIssuesBySprintMock.mockReset();
  });

  it("스프린트별 이슈를 그룹핑한다", () => {
    const sprint = makeSprint("s1");
    const issues = [makeIssue("i1", "s1"), makeIssue("i2")];
    const expectedGroups = {
      sprintGroups: [{ sprint, issues: [issues[0]] }],
      backlogIssues: [issues[1]],
    };

    useSuspenseQueriesMock.mockReturnValue([
      { data: { items: issues } },
      { data: { items: [sprint] } },
    ]);
    groupIssuesBySprintMock.mockReturnValue(expectedGroups);

    const { result } = renderHook(() => useBacklogBoard("proj-1"));

    expect(groupIssuesBySprintMock).toHaveBeenCalledWith(issues, [sprint]);
    expect(result.current.sprintGroups).toEqual(expectedGroups.sprintGroups);
    expect(result.current.backlogIssues).toEqual(expectedGroups.backlogIssues);
  });

  it("스프린트가 없으면 모든 이슈가 backlog으로 분류된다", () => {
    const issues = [makeIssue("i1"), makeIssue("i2")];

    useSuspenseQueriesMock.mockReturnValue([{ data: { items: issues } }, { data: { items: [] } }]);
    groupIssuesBySprintMock.mockReturnValue({
      sprintGroups: [],
      backlogIssues: issues,
    });

    const { result } = renderHook(() => useBacklogBoard("proj-1"));

    expect(result.current.sprintGroups).toEqual([]);
    expect(result.current.backlogIssues).toEqual(issues);
  });

  it("sprints 원본을 반환한다", () => {
    const sprints = [makeSprint("s1"), makeSprint("s2")];

    useSuspenseQueriesMock.mockReturnValue([{ data: { items: [] } }, { data: { items: sprints } }]);
    groupIssuesBySprintMock.mockReturnValue({
      sprintGroups: [],
      backlogIssues: [],
    });

    const { result } = renderHook(() => useBacklogBoard("proj-1"));

    expect(result.current.sprints).toEqual(sprints);
  });
});
