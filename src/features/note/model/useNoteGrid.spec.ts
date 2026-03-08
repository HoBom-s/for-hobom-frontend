import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { NoteItemType } from "@/entities/note";

vi.mock("@/shared/ui", () => ({
  arrayMove: <T>(arr: T[], from: number, to: number): T[] => {
    const next = arr.slice();
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
  },
}));

const { useNoteGrid } = await import("./useNoteGrid");

const makeNote = (overrides: Partial<NoteItemType> = {}): NoteItemType =>
  ({
    id: "note-1",
    owner: "user-1",
    title: "테스트 노트",
    content: "내용",
    type: "TEXT",
    checklistItems: [],
    color: "default",
    labels: [],
    members: [],
    reminder: null,
    isPinned: false,
    status: "ACTIVE",
    trashedAt: null,
    order: 0,
    ...overrides,
  }) as NoteItemType;

describe("useNoteGrid", () => {
  const onTogglePinMock = vi.fn();
  const onReorderMock = vi.fn();

  beforeEach(() => {
    onTogglePinMock.mockReset();
    onReorderMock.mockReset();
  });

  const pinnedNotes = [
    makeNote({ id: "p1", isPinned: true, order: 0 }),
    makeNote({ id: "p2", isPinned: true, order: 1 }),
  ];
  const otherNotes = [
    makeNote({ id: "u1", isPinned: false, order: 0 }),
    makeNote({ id: "u2", isPinned: false, order: 1 }),
  ];

  const setup = (pinned = pinnedNotes, other = otherNotes) =>
    renderHook(() =>
      useNoteGrid({
        pinnedNotes: pinned,
        otherNotes: other,
        onTogglePin: onTogglePinMock,
        onReorder: onReorderMock,
      }),
    );

  describe("초기 상태", () => {
    it("activeId가 null이다", () => {
      const { result } = setup();
      expect(result.current.activeId).toBeNull();
    });

    it("activeNote가 null이다", () => {
      const { result } = setup();
      expect(result.current.activeNote).toBeNull();
    });

    it("allNotes가 pinned + unpinned 순서로 합쳐진다", () => {
      const { result } = setup();
      expect(result.current.allNotes.map((n) => n.id)).toEqual([
        "p1",
        "p2",
        "u1",
        "u2",
      ]);
    });
  });

  describe("handleDragStart", () => {
    it("activeId를 설정한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({ active: { id: "p1" } } as never);
      });

      expect(result.current.activeId).toBe("p1");
      expect(result.current.activeNote?.id).toBe("p1");
    });
  });

  describe("handleDragEnd", () => {
    it("같은 섹션 내 드래그: onReorder를 호출한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd({
          active: { id: "p1" },
          over: { id: "p2" },
        } as never);
      });

      expect(onReorderMock).toHaveBeenCalledWith("p1", 1, expect.any(Array));
      expect(onTogglePinMock).not.toHaveBeenCalled();
    });

    it("다른 섹션으로 드래그: onTogglePin을 호출한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd({
          active: { id: "p1" },
          over: { id: "u1" },
        } as never);
      });

      expect(onTogglePinMock).toHaveBeenCalledWith("p1");
      expect(onReorderMock).not.toHaveBeenCalled();
    });

    it("over가 없으면 아무것도 호출하지 않는다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd({
          active: { id: "p1" },
          over: null,
        } as never);
      });

      expect(onTogglePinMock).not.toHaveBeenCalled();
      expect(onReorderMock).not.toHaveBeenCalled();
    });

    it("같은 위치에 드롭 시 아무것도 호출하지 않는다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragEnd({
          active: { id: "p1" },
          over: { id: "p1" },
        } as never);
      });

      expect(onTogglePinMock).not.toHaveBeenCalled();
      expect(onReorderMock).not.toHaveBeenCalled();
    });
  });

  describe("handleDragCancel", () => {
    it("activeId를 초기화한다", () => {
      const { result } = setup();

      act(() => {
        result.current.handleDragStart({ active: { id: "p1" } } as never);
      });
      expect(result.current.activeId).toBe("p1");

      act(() => {
        result.current.handleDragCancel();
      });
      expect(result.current.activeId).toBeNull();
    });
  });
});
