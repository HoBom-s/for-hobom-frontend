// @vitest-environment happy-dom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { IssueType, IssueTreeResult } from "@/entities/issue";

const buildIssueTreeMock = vi.fn();
const flattenIssueTreeMock = vi.fn();

vi.mock("@/entities/issue", () => ({
  buildIssueTree: (...args: unknown[]) => buildIssueTreeMock(...args),
  flattenIssueTree: (...args: unknown[]) => flattenIssueTreeMock(...args),
}));

const { useCollapsibleTree } = await import("./useCollapsibleTree");

const makeIssue = (id: string, parent?: string): IssueType =>
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
    parent,
  });

const makeTree = (): IssueTreeResult => ({
  roots: [makeIssue("root")],
  childrenMap: new Map([["root", [makeIssue("child-1", "root")]]]),
  parentMap: new Map([["child-1", makeIssue("root")]]),
});

describe("useCollapsibleTree", () => {
  const issues = [makeIssue("root"), makeIssue("child-1", "root")];
  const tree = makeTree();

  it("초기 상태에서 collapsedIds가 비어있다", () => {
    buildIssueTreeMock.mockReturnValue(tree);
    flattenIssueTreeMock.mockReturnValue([
      { issue: makeIssue("root"), depth: 0, childCount: 1 },
      { issue: makeIssue("child-1", "root"), depth: 1, childCount: 0 },
    ]);

    const { result } = renderHook(() => useCollapsibleTree(issues));

    expect(result.current.collapsedIds.size).toBe(0);
  });

  it("buildIssueTree 결과를 issueTree로 반환한다", () => {
    buildIssueTreeMock.mockReturnValue(tree);
    flattenIssueTreeMock.mockReturnValue([]);

    const { result } = renderHook(() => useCollapsibleTree(issues));

    expect(result.current.issueTree).toBe(tree);
    expect(buildIssueTreeMock).toHaveBeenCalledWith(issues);
  });

  it("flattenIssueTree 결과를 flatTree로 반환한다", () => {
    const flat = [{ issue: makeIssue("root"), depth: 0, childCount: 1 }];

    buildIssueTreeMock.mockReturnValue(tree);
    flattenIssueTreeMock.mockReturnValue(flat);

    const { result } = renderHook(() => useCollapsibleTree(issues));

    expect(result.current.flatTree).toBe(flat);
  });

  describe("toggleCollapse", () => {
    it("접기: issueId를 collapsedIds에 추가한다", () => {
      buildIssueTreeMock.mockReturnValue(tree);
      flattenIssueTreeMock.mockReturnValue([]);

      const { result } = renderHook(() => useCollapsibleTree(issues));

      act(() => result.current.toggleCollapse("root"));

      expect(result.current.collapsedIds.has("root")).toBe(true);
    });

    it("펼치기: 이미 접힌 issueId를 다시 호출하면 제거한다", () => {
      buildIssueTreeMock.mockReturnValue(tree);
      flattenIssueTreeMock.mockReturnValue([]);

      const { result } = renderHook(() => useCollapsibleTree(issues));

      act(() => result.current.toggleCollapse("root"));
      expect(result.current.collapsedIds.has("root")).toBe(true);

      act(() => result.current.toggleCollapse("root"));
      expect(result.current.collapsedIds.has("root")).toBe(false);
    });

    it("collapsedIds 변경 시 flattenIssueTree가 새 collapsedIds로 호출된다", () => {
      buildIssueTreeMock.mockReturnValue(tree);
      flattenIssueTreeMock.mockReturnValue([]);

      const { result } = renderHook(() => useCollapsibleTree(issues));

      act(() => result.current.toggleCollapse("root"));

      const lastCall = flattenIssueTreeMock.mock.calls[flattenIssueTreeMock.mock.calls.length - 1];

      expect(lastCall?.[1].has("root")).toBe(true);
    });
  });
});
