// @vitest-environment happy-dom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IssueType } from "@/entities/issue";
import type { ColumnMap } from "../lib/kanban-dnd.lib";

vi.mock("@/shared/ui", () => ({
  arrayMove: <T>(arr: T[], from: number, to: number): T[] => {
    const next = arr.slice();
    const [item] = next.splice(from, 1);

    if (item === undefined) return next;

    next.splice(to, 0, item);

    return next;
  },
}));

vi.mock("../lib/kanban-dnd.lib", () => ({
  findColumnOfIssue: (columns: ColumnMap, issueId: string) => {
    for (const [status, issues] of Object.entries(columns)) {
      if (issues.some((i) => i.id === issueId)) return status;
    }

    return null;
  },
  resolveDropTarget: (columns: ColumnMap, overId: string) => {
    if (overId.startsWith("column-")) return overId.slice(7);
    for (const [status, issues] of Object.entries(columns)) {
      if (issues.some((i) => i.id === overId)) return status;
    }

    return null;
  },
}));

const { useKanbanDnd } = await import("./useKanbanDnd");

const makeIssue = (id: string, status: string): IssueType =>
  ({
    id,
    project: "proj-1",
    issueNumber: 1,
    issueKey: `PROJ-${id}`,
    type: "TASK",
    title: `이슈 ${id}`,
    status,
    priority: "MEDIUM",
    reporter: "user-1",
    labels: [],
  }) as IssueType;

const makeColumns = (): ColumnMap => ({
  todo: [makeIssue("i1", "todo"), makeIssue("i2", "todo")],
  "in-progress": [makeIssue("i3", "in-progress")],
  done: [],
});

describe("useKanbanDnd", () => {
  const transitionIssueMock = vi.fn();

  beforeEach(() => {
    transitionIssueMock.mockReset();
  });

  const setup = (columns = makeColumns()) =>
    renderHook(() =>
      useKanbanDnd({
        groupedByStatus: columns,
        transitionIssue: transitionIssueMock,
        projectId: "proj-1",
      }),
    );

  describe("초기 상태", () => {
    it("activeIssue가 null이다", () => {
      const { result } = setup();

      expect(result.current.activeIssue).toBeNull();
    });

    it("columns가 groupedByStatus와 같다", () => {
      const columns = makeColumns();
      const { result } = setup(columns);

      expect(Object.keys(result.current.columns)).toEqual(Object.keys(columns));
    });
  });

  describe("handleDragStart", () => {
    it("activeIssue를 설정한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      expect(result.current.activeIssue?.id).toBe("i1");
    });
  });

  describe("handleDragOver", () => {
    it("다른 컬럼으로 이동 시 columns를 업데이트한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      act(() => {
        result.current.handleDragOver({
          active: { id: "i1" },
          over: { id: "i3" },
        } as never);
      });

      expect(result.current.columns["todo"]?.length).toBe(1);
      expect(result.current.columns["in-progress"]?.some((i) => i.id === "i1")).toBe(true);
    });

    it("over가 없으면 아무것도 하지 않는다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      const before = { ...result.current.columns };

      act(() => {
        result.current.handleDragOver({
          active: { id: "i1" },
          over: null,
        } as never);
      });

      expect(result.current.columns["todo"]?.length).toBe(before["todo"]?.length);
    });
  });

  describe("handleDragEnd", () => {
    it("같은 컬럼 내 재정렬 시 transitionIssue를 호출하지 않는다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      act(() => {
        result.current.handleDragEnd({
          active: { id: "i1" },
          over: { id: "i2" },
        } as never);
      });

      expect(transitionIssueMock).not.toHaveBeenCalled();
      expect(result.current.activeIssue).toBeNull();
    });

    it("다른 컬럼으로 이동 시 transitionIssue를 호출한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      // handleDragOver로 먼저 컬럼 간 이동
      act(() => {
        result.current.handleDragOver({
          active: { id: "i1" },
          over: { id: "column-in-progress" },
        } as never);
      });

      act(() => {
        result.current.handleDragEnd({
          active: { id: "i1" },
          over: { id: "column-in-progress" },
        } as never);
      });

      expect(transitionIssueMock).toHaveBeenCalledWith({
        projectId: "proj-1",
        issueId: "i1",
        statusId: "in-progress",
      });
    });

    it("over가 없으면 snapshot으로 롤백한다", () => {
      const columns = makeColumns();
      const { result } = setup(columns);

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      act(() => {
        result.current.handleDragEnd({
          active: { id: "i1" },
          over: null,
        } as never);
      });

      expect(result.current.columns["todo"]?.length).toBe(2);
      expect(result.current.activeIssue).toBeNull();
    });
  });

  describe("handleDragCancel", () => {
    it("snapshot으로 롤백하고 activeId를 초기화한다", () => {
      const columns = makeColumns();
      const { result } = setup(columns);

      act(() => {
        result.current.handleDragStart({
          active: { id: "i1" },
        } as never);
      });

      // 드래그 중 이동
      act(() => {
        result.current.handleDragOver({
          active: { id: "i1" },
          over: { id: "column-in-progress" },
        } as never);
      });

      act(() => {
        result.current.handleDragCancel();
      });

      expect(result.current.activeIssue).toBeNull();
      expect(result.current.columns["todo"]?.length).toBe(2);
    });
  });
});
