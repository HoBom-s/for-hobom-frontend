// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const navigateMock = vi.fn();
let mockParams: Record<string, string> = {};
let mockPathname = "/projects/proj-1/board";

vi.mock("react-router-dom", () => ({
  useParams: () => mockParams,
  useNavigate: () => navigateMock,
  useLocation: () => ({ pathname: mockPathname }),
}));

const useSuspenseQueriesMock = vi.fn();

vi.mock("hobom-data", () => ({
  useSuspenseQueries: (opts: unknown) => useSuspenseQueriesMock(opts),
}));

vi.mock("@/entities/project", () => ({
  projectQueries: {
    detail: (projectId: string) => ({
      queryKey: ["projects", "detail", projectId],
    }),
  },
  buildStatusesFromColumns: (cols: Record<string, unknown>[]) =>
    cols.map((c, i) => ({
      id: c.statusId,
      name: c.name,
      isDone: false,
      order: i,
    })),
  buildTransitionsFromColumns: (cols: Record<string, unknown>[]) =>
    cols.flatMap((c) =>
      cols
        .filter((t) => t.statusId !== c.statusId)
        .map((t) => ({ from: c.statusId, to: t.statusId, name: "" })),
    ),
  getDoneStatusIds: (statuses: { id: string; isDone: boolean }[]) =>
    new Set(statuses.filter((s) => s.isDone).map((s) => s.id)),
}));

vi.mock("@/entities/board", () => ({
  boardQueries: {
    listByProject: (projectId: string) => ({
      queryKey: ["boards", "list", projectId],
    }),
  },
  DEFAULT_BOARD_COLUMNS: [
    { statusId: "todo", name: "할 일", order: 0 },
    { statusId: "done", name: "완료", order: 1 },
  ],
}));

vi.mock("@/shared/lib", () => ({
  assertCondition: (value: unknown, message: string) => {
    if (!value) throw new Error(message);
  },
}));

const { useProjectLayout, TABS } = await import("./useProjectLayout");

describe("useProjectLayout", () => {
  beforeEach(() => {
    navigateMock.mockReset();
    useSuspenseQueriesMock.mockReset();
    mockParams = { projectId: "proj-1" };
    mockPathname = "/projects/proj-1/board";
  });

  const setupQueries = (
    project: Record<string, unknown> = { workflow: null },
    boards: Record<string, unknown>[] = [],
  ) => {
    useSuspenseQueriesMock.mockReturnValue([
      { data: { items: project } },
      { data: { items: boards } },
    ]);
  };

  it("projectId가 없으면 throw한다", () => {
    mockParams = {};
    setupQueries();

    expect(() => renderHook(() => useProjectLayout())).toThrow(
      "projectId is required in route params",
    );
  });

  it("projectId를 정상 반환한다", () => {
    setupQueries();

    const { result } = renderHook(() => useProjectLayout());

    expect(result.current.projectId).toBe("proj-1");
  });

  it("workflow가 있으면 해당 statuses/transitions를 사용한다", () => {
    const statuses = [
      { id: "open", name: "Open", isDone: false, order: 0 },
      { id: "closed", name: "Closed", isDone: true, order: 1 },
    ];
    const transitions = [{ from: "open", to: "closed", name: "Close" }];

    setupQueries({ workflow: { statuses, transitions } });

    const { result } = renderHook(() => useProjectLayout());

    expect(result.current.projectCtx.statuses).toEqual(statuses);
    expect(result.current.projectCtx.transitions).toEqual(transitions);
  });

  it("workflow가 null이면 보드 컬럼에서 statuses를 생성한다", () => {
    setupQueries({ workflow: null }, [
      {
        type: "KANBAN",
        columns: [
          { statusId: "todo", name: "할 일", order: 0 },
          { statusId: "doing", name: "진행 중", order: 1 },
        ],
      },
    ]);

    const { result } = renderHook(() => useProjectLayout());

    expect(result.current.projectCtx.statuses.length).toBe(2);
    expect(result.current.projectCtx.statuses[0].id).toBe("todo");
  });

  it("board, backlog, issues 탭에서 showIssueButton이 true이다", () => {
    setupQueries();

    mockPathname = "/projects/proj-1/board";
    const { result: r1 } = renderHook(() => useProjectLayout());

    expect(r1.current.showIssueButton).toBe(true);

    mockPathname = "/projects/proj-1/backlog";
    const { result: r2 } = renderHook(() => useProjectLayout());

    expect(r2.current.showIssueButton).toBe(true);

    mockPathname = "/projects/proj-1/issues";
    const { result: r3 } = renderHook(() => useProjectLayout());

    expect(r3.current.showIssueButton).toBe(true);
  });

  it("settings 탭에서 showIssueButton이 false이다", () => {
    setupQueries();
    mockPathname = "/projects/proj-1/settings";

    const { result } = renderHook(() => useProjectLayout());

    expect(result.current.showIssueButton).toBe(false);
  });

  it("backlog 탭에서만 showSprintButton이 true이다", () => {
    setupQueries();

    mockPathname = "/projects/proj-1/backlog";
    const { result: r1 } = renderHook(() => useProjectLayout());

    expect(r1.current.showSprintButton).toBe(true);

    mockPathname = "/projects/proj-1/board";
    const { result: r2 } = renderHook(() => useProjectLayout());

    expect(r2.current.showSprintButton).toBe(false);
  });

  it("TABS가 올바른 구조를 가진다", () => {
    expect(TABS.length).toBe(5);
    expect(TABS.map((t) => t.path)).toEqual([
      "board",
      "backlog",
      "issues",
      "dashboard",
      "settings",
    ]);
  });
});
