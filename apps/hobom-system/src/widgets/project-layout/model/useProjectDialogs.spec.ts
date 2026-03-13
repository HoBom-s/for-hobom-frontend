import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useProjectDialogs } from "./useProjectDialogs";

describe("useProjectDialogs", () => {
  describe("issueDialog", () => {
    it("초기 상태는 닫혀 있다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      expect(result.current.issueDialog.open).toBe(false);
      expect(result.current.issueDialog.defaultParentId).toBeUndefined();
    });

    it("setOpen(true)로 열 수 있다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      act(() => result.current.issueDialog.setOpen(true));

      expect(result.current.issueDialog.open).toBe(true);
    });

    it("close()하면 defaultParentId도 초기화된다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      act(() => result.current.handleCreateChildIssue("parent-1"));
      expect(result.current.issueDialog.open).toBe(true);
      expect(result.current.issueDialog.defaultParentId).toBe("parent-1");

      act(() => result.current.issueDialog.close());

      expect(result.current.issueDialog.open).toBe(false);
      expect(result.current.issueDialog.defaultParentId).toBeUndefined();
    });
  });

  describe("sprintDialog", () => {
    it("초기 상태는 닫혀 있다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      expect(result.current.sprintDialog.open).toBe(false);
    });

    it("setOpen(true)로 열고 close()로 닫을 수 있다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      act(() => result.current.sprintDialog.setOpen(true));
      expect(result.current.sprintDialog.open).toBe(true);

      act(() => result.current.sprintDialog.close());
      expect(result.current.sprintDialog.open).toBe(false);
    });
  });

  describe("handleCreateChildIssue", () => {
    it("parentId를 설정하고 이슈 다이얼로그를 연다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      act(() => result.current.handleCreateChildIssue("ISSUE-42"));

      expect(result.current.issueDialog.open).toBe(true);
      expect(result.current.issueDialog.defaultParentId).toBe("ISSUE-42");
    });
  });

  describe("handleOpenIssueDetail", () => {
    it("detailIssueId를 설정한다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      expect(result.current.detailIssueId).toBeNull();

      act(() => result.current.handleOpenIssueDetail("ISSUE-99"));

      expect(result.current.detailIssueId).toBe("ISSUE-99");
    });

    it("setDetailIssueId(null)로 초기화할 수 있다", () => {
      const { result } = renderHook(() => useProjectDialogs());

      act(() => result.current.handleOpenIssueDetail("ISSUE-99"));
      act(() => result.current.setDetailIssueId(null));

      expect(result.current.detailIssueId).toBeNull();
    });
  });
});
