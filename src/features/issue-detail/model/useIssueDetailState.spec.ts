import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IssueType } from "@/entities/issue";

const useQueryMock = vi.fn();
const useProjectContextMock = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useQuery: (opts: Record<string, unknown>) => useQueryMock(opts),
}));

vi.mock("@/shared/model", () => ({
  useProjectContext: () => useProjectContextMock(),
}));

vi.mock("@/entities/issue", async () => {
  const { buildIssueTree, getDescendantProgress, isDescendantOf } =
    await import("../../../entities/issue/lib/issue-tree.lib");
  return {
    issueQueries: {
      listByProject: (projectId: string) => ({
        queryKey: ["issues", "list", projectId],
      }),
    },
    buildIssueTree,
    getDescendantProgress,
    isDescendantOf,
    PARENT_ISSUE_KINDS: new Set(["EPIC", "STORY"]),
  };
});

vi.mock("@/entities/sprint", () => ({
  sprintQueries: {
    listByProject: (projectId: string) => ({
      queryKey: ["sprints", "list", projectId],
    }),
  },
}));

vi.mock("@/entities/project", () => ({
  projectQueries: {
    detail: (id: string) => ({ queryKey: ["projects", "detail", id] }),
  },
}));

vi.mock("@/entities/user", () => ({
  userQueries: {
    me: () => ({ queryKey: ["user", "me"] }),
    list: () => ({ queryKey: ["users", "list"] }),
  },
}));

const { useIssueDetailState } = await import("./useIssueDetailState");

const makeIssue = (overrides: Partial<IssueType> = {}): IssueType =>
  ({
    id: "issue-1",
    project: "proj-1",
    issueNumber: 1,
    issueKey: "PROJ-1",
    type: "TASK",
    title: "테스트 이슈",
    status: "todo",
    priority: "MEDIUM",
    reporter: "user-1",
    labels: [],
    ...overrides,
  }) as IssueType;

describe("useIssueDetailState", () => {
  beforeEach(() => {
    useQueryMock.mockReset();
    useProjectContextMock.mockReset();
    useProjectContextMock.mockReturnValue({
      doneStatusIds: new Set(["done"]),
    });
  });

  const setupQueries = (
    issues: IssueType[] = [],
    sprints: Array<{ id: string; status: string }> = [],
    user: { id: string } = { id: "user-1" },
    project: {
      members: Array<{ userId: string; role: string; joinedAt: string }>;
    } = { members: [] },
    users: Array<{ id: string; nickname: string }> = [],
  ) => {
    let callIndex = 0;
    useQueryMock.mockImplementation(() => {
      const idx = callIndex++;
      if (idx === 0) return { data: { items: issues } };
      if (idx === 1) return { data: { items: sprints } };
      if (idx === 2) return { data: user };
      if (idx === 3) return { data: { items: project } };
      if (idx === 4) return { data: { items: users } };
      return { data: undefined };
    });
  };

  it("이슈 데이터에서 해당 issue를 찾아 반환한다", () => {
    const issue = makeIssue({ id: "issue-1" });
    setupQueries([issue]);

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", "issue-1", true),
    );

    expect(result.current.issue?.id).toBe("issue-1");
  });

  it("parent와 children을 정확히 추출한다", () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC" });
    const story = makeIssue({
      id: "story-1",
      type: "STORY",
      parent: "epic-1",
    });
    const task = makeIssue({
      id: "task-1",
      type: "TASK",
      parent: "story-1",
    });
    setupQueries([epic, story, task]);

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", "story-1", true),
    );

    expect(result.current.parentIssue?.id).toBe("epic-1");
    expect(result.current.childIssues.map((c) => c.id)).toEqual(["task-1"]);
  });

  it("availableParents에서 자기 자신과 하위 이슈를 제외한다", () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC" });
    const story = makeIssue({
      id: "story-1",
      type: "STORY",
      parent: "epic-1",
    });
    const otherEpic = makeIssue({ id: "epic-2", type: "EPIC" });
    setupQueries([epic, story, otherEpic]);

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", "epic-1", true),
    );

    const parentIds = result.current.availableParents.map((p) => p.id);
    expect(parentIds).not.toContain("epic-1");
    expect(parentIds).not.toContain("story-1");
    expect(parentIds).toContain("epic-2");
  });

  it("TASK 타입은 availableParents에 포함하지 않는다", () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC" });
    const task = makeIssue({ id: "task-1", type: "TASK" });
    setupQueries([epic, task]);

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", "epic-1", true),
    );

    const parentIds = result.current.availableParents.map((p) => p.id);
    expect(parentIds).not.toContain("task-1");
  });

  it("COMPLETED 스프린트를 필터링한다", () => {
    setupQueries(
      [makeIssue()],
      [
        { id: "sprint-1", status: "ACTIVE" },
        { id: "sprint-2", status: "COMPLETED" },
        { id: "sprint-3", status: "PLANNED" },
      ],
    );

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", "issue-1", true),
    );

    expect(result.current.activeSprints.map((s) => s.id)).toEqual([
      "sprint-1",
      "sprint-3",
    ]);
  });

  it("progress를 done status 기준으로 계산한다", () => {
    const epic = makeIssue({ id: "epic-1", type: "EPIC", status: "todo" });
    const child1 = makeIssue({
      id: "child-1",
      type: "TASK",
      parent: "epic-1",
      status: "done",
    });
    const child2 = makeIssue({
      id: "child-2",
      type: "TASK",
      parent: "epic-1",
      status: "todo",
    });
    setupQueries([epic, child1, child2]);

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", "epic-1", true),
    );

    expect(result.current.progress).toEqual({ completed: 1, total: 2 });
  });

  it("issueId가 null이면 issue가 undefined이다", () => {
    setupQueries([makeIssue()]);

    const { result } = renderHook(() =>
      useIssueDetailState("proj-1", null, true),
    );

    expect(result.current.issue).toBeUndefined();
  });

  describe("projectMembers", () => {
    it("프로젝트 멤버의 닉네임을 resolve한다", () => {
      setupQueries(
        [makeIssue()],
        [],
        { id: "user-1" },
        {
          members: [
            { userId: "user-1", role: "ADMIN", joinedAt: "2026-01-01" },
            { userId: "user-2", role: "MEMBER", joinedAt: "2026-01-02" },
          ],
        },
        [
          { id: "user-1", nickname: "홍길동" },
          { id: "user-2", nickname: "김철수" },
        ],
      );

      const { result } = renderHook(() =>
        useIssueDetailState("proj-1", "issue-1", true),
      );

      expect(result.current.projectMembers).toEqual([
        { userId: "user-1", nickname: "홍길동" },
        { userId: "user-2", nickname: "김철수" },
      ]);
    });

    it("유저 정보가 없으면 userId를 닉네임 대신 사용한다", () => {
      setupQueries(
        [makeIssue()],
        [],
        { id: "user-1" },
        {
          members: [
            { userId: "unknown-user", role: "MEMBER", joinedAt: "2026-01-01" },
          ],
        },
        [{ id: "user-1", nickname: "홍길동" }],
      );

      const { result } = renderHook(() =>
        useIssueDetailState("proj-1", "issue-1", true),
      );

      expect(result.current.projectMembers).toEqual([
        { userId: "unknown-user", nickname: "unknown-user" },
      ]);
    });

    it("프로젝트 또는 유저 데이터가 없으면 빈 배열을 반환한다", () => {
      let callIndex = 0;
      useQueryMock.mockImplementation(() => {
        const idx = callIndex++;
        if (idx === 0) return { data: { items: [makeIssue()] } };
        if (idx === 1) return { data: { items: [] } };
        if (idx === 2) return { data: { id: "user-1" } };
        return { data: undefined };
      });

      const { result } = renderHook(() =>
        useIssueDetailState("proj-1", "issue-1", true),
      );

      expect(result.current.projectMembers).toEqual([]);
    });
  });
});
