import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { BoardDto } from "@/entities/board";

const mutateBoardMock = vi.fn();
const mutateWorkflowMock = vi.fn();

vi.mock("@/entities/board", () => ({
  useUpdateBoard: () => ({
    mutate: mutateBoardMock,
    isPending: false,
  }),
}));

vi.mock("@/entities/project", () => ({
  useUpdateWorkflow: () => ({ mutate: mutateWorkflowMock }),
  buildStatusesFromColumns: (cols: unknown[]) => cols,
  buildTransitionsFromColumns: (cols: unknown[]) => cols,
}));

// dynamic import 후 mock이 적용된 모듈을 가져옴
const { useBoardItem } = await import("./useBoardItem");

const makeBoard = (overrides: Partial<BoardDto> = {}): BoardDto =>
  ({
    id: "board-1",
    name: "기본 보드",
    type: "KANBAN",
    columns: [
      { statusId: "todo", name: "할 일", order: 0 },
      { statusId: "in_progress", name: "진행 중", order: 1 },
      { statusId: "done", name: "완료", order: 2 },
    ],
    ...overrides,
  }) as BoardDto;

describe("useBoardItem", () => {
  beforeEach(() => {
    mutateBoardMock.mockReset();
    mutateWorkflowMock.mockReset();
  });

  describe("초기 상태", () => {
    it("isEditing이 false이다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );
      expect(result.current.isEditing).toBe(false);
    });

    it("editName이 보드 이름과 같다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard({ name: "테스트 보드" }), "project-1"),
      );
      expect(result.current.editName).toBe("테스트 보드");
    });

    it("newStatusId, newStatusName이 비어있다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );
      expect(result.current.newStatusId).toBe("");
      expect(result.current.newStatusName).toBe("");
    });
  });

  describe("handleSaveName", () => {
    it("이름이 변경되면 updateBoard를 호출한다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setEditName("새 이름"));
      act(() => result.current.handleSaveName());

      expect(mutateBoardMock).toHaveBeenCalledWith(
        { projectId: "project-1", boardId: "board-1", name: "새 이름" },
        expect.any(Object),
      );
    });

    it("이름이 같으면 API를 호출하지 않는다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard({ name: "기본 보드" }), "project-1"),
      );

      act(() => result.current.handleSaveName());

      expect(mutateBoardMock).not.toHaveBeenCalled();
    });

    it("공백만 있으면 API를 호출하지 않고 원래 이름으로 복원한다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard({ name: "기본 보드" }), "project-1"),
      );

      act(() => result.current.setEditName("   "));
      act(() => result.current.handleSaveName());

      expect(mutateBoardMock).not.toHaveBeenCalled();
      expect(result.current.editName).toBe("기본 보드");
      expect(result.current.isEditing).toBe(false);
    });
  });

  describe("handleAddColumn", () => {
    it("유효한 id와 name이면 syncColumns를 호출한다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setNewStatusId("review"));
      act(() => result.current.setNewStatusName("리뷰"));
      act(() => result.current.handleAddColumn());

      expect(mutateBoardMock).toHaveBeenCalled();
      expect(mutateWorkflowMock).toHaveBeenCalled();
      // 입력값이 초기화된다
      expect(result.current.newStatusId).toBe("");
      expect(result.current.newStatusName).toBe("");
    });

    it("id가 비어있으면 호출하지 않는다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setNewStatusName("리뷰"));
      act(() => result.current.handleAddColumn());

      expect(mutateBoardMock).not.toHaveBeenCalled();
    });

    it("name이 비어있으면 호출하지 않는다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setNewStatusId("review"));
      act(() => result.current.handleAddColumn());

      expect(mutateBoardMock).not.toHaveBeenCalled();
    });

    it("중복 statusId이면 호출하지 않는다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setNewStatusId("todo")); // 이미 존재
      act(() => result.current.setNewStatusName("중복"));
      act(() => result.current.handleAddColumn());

      expect(mutateBoardMock).not.toHaveBeenCalled();
    });
  });

  describe("handleRemoveColumn", () => {
    it("해당 statusId 컬럼을 제거하고 syncColumns를 호출한다", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.handleRemoveColumn("in_progress"));

      expect(mutateBoardMock).toHaveBeenCalled();
      expect(mutateWorkflowMock).toHaveBeenCalled();
    });
  });

  describe("isDuplicate", () => {
    it("기존 statusId와 같으면 true", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setNewStatusId("TODO")); // 대소문자 무시 (lowercase 변환)

      expect(result.current.isDuplicate).toBe(true);
    });

    it("새로운 statusId면 false", () => {
      const { result } = renderHook(() =>
        useBoardItem(makeBoard(), "project-1"),
      );

      act(() => result.current.setNewStatusId("review"));

      expect(result.current.isDuplicate).toBe(false);
    });
  });
});
