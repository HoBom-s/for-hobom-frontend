import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { IssueType, IssueTreeResult } from "@/entities/issue";
import type { ColumnMap } from "../lib/kanban-dnd.lib";

vi.mock("hobom-utils", () => {
  const flatMap =
    <T, R>(fn: (item: T) => R[]) =>
    (arr: T[]): R[] =>
      arr.flatMap(fn);
  const filter =
    <T>(fn: (item: T) => boolean) =>
    (arr: T[]): T[] =>
      arr.filter(fn);
  const pipe = (...args: unknown[]) => {
    const [initial, ...fns] = args;

    return (fns as ((v: unknown) => unknown)[]).reduce(
      (acc, fn) => fn(acc),
      initial,
    );
  };

  return { Bom: { pipe, flatMap, filter } };
});

const filterColumnsByEpicMock = vi.fn();
const buildSwimlaneGroupsMock = vi.fn();

vi.mock("../lib/kanban-filter.lib", () => ({
  filterColumnsByEpic: (...args: unknown[]) => filterColumnsByEpicMock(...args),
  buildSwimlaneGroups: (...args: unknown[]) => buildSwimlaneGroupsMock(...args),
}));

const { useKanbanFilters } = await import("./useKanbanFilters");

const makeIssue = (
  id: string,
  status: string,
  type = "TASK" as IssueType["type"],
): IssueType =>
  ({
    id,
    project: "proj-1",
    issueNumber: 1,
    issueKey: `PROJ-${id}`,
    type,
    title: `이슈 ${id}`,
    status,
    priority: "MEDIUM",
    reporter: "user-1",
    labels: [],
  }) as IssueType;

const makeTree = (): IssueTreeResult => ({
  roots: [],
  childrenMap: new Map(),
  parentMap: new Map(),
});

describe("useKanbanFilters", () => {
  beforeEach(() => {
    filterColumnsByEpicMock.mockReset();
    buildSwimlaneGroupsMock.mockReset();
  });

  const columns: ColumnMap = {
    todo: [makeIssue("i1", "todo"), makeIssue("e1", "todo", "EPIC")],
    done: [makeIssue("i2", "done")],
  };

  const setup = (cols = columns) =>
    renderHook(() =>
      useKanbanFilters({
        columns: cols,
        issueTree: makeTree(),
        doneStatusIds: new Set(["done"]),
        groupedByStatus: cols,
      }),
    );

  describe("초기 상태", () => {
    it("epicFilter가 null이다", () => {
      const { result } = setup();

      expect(result.current.epicFilter).toBeNull();
    });

    it("swimlaneEnabled가 false이다", () => {
      const { result } = setup();

      expect(result.current.swimlaneEnabled).toBe(false);
    });

    it("swimlaneGroups가 null이다", () => {
      const { result } = setup();

      expect(result.current.swimlaneGroups).toBeNull();
    });
  });

  describe("epics 추출", () => {
    it("EPIC 타입 이슈만 추출한다", () => {
      const { result } = setup();

      expect(result.current.epics.map((e) => e.id)).toEqual(["e1"]);
    });
  });

  describe("epicFilter", () => {
    it("epicFilter 설정 시 filterColumnsByEpic을 호출한다", () => {
      const filtered: ColumnMap = { todo: [makeIssue("i1", "todo")], done: [] };

      filterColumnsByEpicMock.mockReturnValue(filtered);

      const { result } = setup();

      act(() => result.current.setEpicFilter("e1"));

      expect(filterColumnsByEpicMock).toHaveBeenCalledWith(
        columns,
        "e1",
        expect.any(Map),
      );
      expect(result.current.filteredColumns).toBe(filtered);
    });

    it("epicFilter가 null이면 원래 columns를 반환한다", () => {
      const { result } = setup();

      expect(result.current.filteredColumns).toBe(columns);
    });
  });

  describe("swimlane", () => {
    it("toggleSwimlane 호출 시 swimlaneEnabled가 토글된다", () => {
      const { result } = setup();

      act(() => result.current.toggleSwimlane());
      expect(result.current.swimlaneEnabled).toBe(true);

      act(() => result.current.toggleSwimlane());
      expect(result.current.swimlaneEnabled).toBe(false);
    });

    it("swimlane 활성화 시 buildSwimlaneGroups를 호출한다", () => {
      const groups = [{ epicId: null, epicKey: null, epicTitle: "에픽 없음" }];

      buildSwimlaneGroupsMock.mockReturnValue(groups);

      const { result } = setup();

      act(() => result.current.toggleSwimlane());

      expect(buildSwimlaneGroupsMock).toHaveBeenCalled();
      expect(result.current.swimlaneGroups).toBe(groups);
    });
  });
});
