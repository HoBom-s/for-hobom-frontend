// @vitest-environment happy-dom
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NOTE_COLORS } from "@/entities/note";
import type { NoteItemType } from "@/entities/note";
import { useNoteForm } from "./useNoteForm";

const makeNote = (overrides: Partial<NoteItemType> = {}): NoteItemType => ({
  id: "note-1",
  owner: "owner-1",
  title: "제목",
  content: "내용",
  type: "TEXT",
  checklistItems: [],
  color: "#fff475",
  labels: ["label-1"],
  members: [],
  reminder: null,
  isPinned: false,
  status: "ACTIVE",
  trashedAt: null,
  order: 0,
  ...overrides,
});

describe("useNoteForm", () => {
  describe("초기화", () => {
    it("open=true, note=null이면 빈 폼 상태로 초기화된다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      expect(result.current.form).toEqual({
        title: "",
        content: "",
        type: "TEXT",
        checklistItems: [],
        color: NOTE_COLORS.DEFAULT,
        labels: [],
        reminder: null,
      });
    });

    it("open=true, note가 주어지면 노트 데이터로 초기화된다", () => {
      const note = makeNote();
      const { result } = renderHook(() => useNoteForm(true, note));

      expect(result.current.form.title).toBe("제목");
      expect(result.current.form.content).toBe("내용");
      expect(result.current.form.color).toBe("#fff475");
      expect(result.current.form.labels).toEqual(["label-1"]);
    });

    it("open=false이면 이전 상태를 유지한다", () => {
      const { result, rerender } = renderHook(({ open, note }) => useNoteForm(open, note), {
        initialProps: { open: true, note: null },
      });

      act(() => result.current.setField("title", "작성중"));
      rerender({ open: false, note: null });

      expect(result.current.form.title).toBe("작성중");
    });

    it("open이 false→true로 바뀌면 폼이 리셋된다", () => {
      const { result, rerender } = renderHook(({ open, note }) => useNoteForm(open, note), {
        initialProps: {
          open: true as boolean,
          note: null as NoteItemType | null,
        },
      });

      act(() => result.current.setField("title", "작성중"));
      rerender({ open: false, note: null });
      rerender({ open: true, note: null });

      expect(result.current.form.title).toBe("");
    });
  });

  describe("setField", () => {
    it("단일 필드를 업데이트한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("title", "새 제목"));

      expect(result.current.form.title).toBe("새 제목");
    });

    it("다른 필드에 영향을 주지 않는다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("title", "제목"));
      act(() => result.current.setField("content", "내용"));

      expect(result.current.form.title).toBe("제목");
      expect(result.current.form.content).toBe("내용");
    });
  });

  describe("toggleType", () => {
    it("TEXT → CHECKLIST: content를 체크리스트로 변환한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("content", "사과\n바나나"));
      act(() => result.current.toggleType());

      expect(result.current.form.type).toBe("CHECKLIST");
      expect(result.current.form.checklistItems).toHaveLength(2);
      expect(result.current.form.checklistItems[0]!.text).toBe("사과");
      expect(result.current.form.checklistItems[1]!.text).toBe("바나나");
      expect(result.current.form.content).toBe("");
    });

    it("TEXT → CHECKLIST: content가 비어있으면 빈 아이템 1개 생성", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleType());

      expect(result.current.form.type).toBe("CHECKLIST");
      expect(result.current.form.checklistItems).toHaveLength(1);
      expect(result.current.form.checklistItems[0]!.text).toBe("");
    });

    it("CHECKLIST → TEXT: 체크리스트를 텍스트로 변환한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("content", "A\nB"));
      act(() => result.current.toggleType());
      act(() => result.current.toggleType());

      expect(result.current.form.type).toBe("TEXT");
      expect(result.current.form.content).toBe("A\nB");
      expect(result.current.form.checklistItems).toEqual([]);
    });
  });

  describe("checklist 조작", () => {
    it("addChecklistItem: 빈 아이템을 추가한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleType());
      const initialLength = result.current.form.checklistItems.length;

      act(() => result.current.addChecklistItem());

      expect(result.current.form.checklistItems).toHaveLength(initialLength + 1);
    });

    it("updateChecklistItem: 특정 아이템의 text를 업데이트한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleType());
      act(() => result.current.updateChecklistItem(0, "text", "할 일"));

      expect(result.current.form.checklistItems[0]!.text).toBe("할 일");
    });

    it("updateChecklistItem: 특정 아이템의 checked를 업데이트한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleType());
      act(() => result.current.updateChecklistItem(0, "checked", true));

      expect(result.current.form.checklistItems[0]!.checked).toBe(true);
    });

    it("removeChecklistItem: 특정 인덱스의 아이템을 제거한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("content", "A\nB\nC"));
      act(() => result.current.toggleType());

      expect(result.current.form.checklistItems).toHaveLength(3);

      act(() => result.current.removeChecklistItem(1));

      expect(result.current.form.checklistItems).toHaveLength(2);
      expect(result.current.form.checklistItems[0]!.text).toBe("A");
      expect(result.current.form.checklistItems[1]!.text).toBe("C");
    });
  });

  describe("toggleLabel", () => {
    it("없는 라벨을 추가한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleLabel("label-1"));

      expect(result.current.form.labels).toEqual(["label-1"]);
    });

    it("있는 라벨을 제거한다", () => {
      const note = makeNote({
        labels: ["label-1", "label-2"],
      });
      const { result } = renderHook(() => useNoteForm(true, note));

      act(() => result.current.toggleLabel("label-1"));

      expect(result.current.form.labels).toEqual(["label-2"]);
    });

    it("연속 토글하면 원래 상태로 돌아온다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleLabel("label-1"));
      act(() => result.current.toggleLabel("label-1"));

      expect(result.current.form.labels).toEqual([]);
    });
  });

  describe("reminder", () => {
    it("setReminder: 리마인더를 설정한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setReminder("2026-03-01", "WEEKLY"));

      expect(result.current.form.reminder).not.toBeNull();
      expect(result.current.form.reminder!.recurrence).toBe("WEEKLY");
    });

    it("clearReminder: 리마인더를 제거한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setReminder("2026-03-01", "NONE"));
      act(() => result.current.clearReminder());

      expect(result.current.form.reminder).toBeNull();
    });
  });

  describe("hasContent", () => {
    it("모두 비어있으면 falsy", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      expect(result.current.hasContent).toBeFalsy();
    });

    it("title만 있어도 truthy", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("title", "제목"));

      expect(result.current.hasContent).toBeTruthy();
    });

    it("content만 있어도 truthy", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("content", "내용"));

      expect(result.current.hasContent).toBeTruthy();
    });

    it("체크리스트에 텍스트가 있으면 truthy", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleType());
      act(() => result.current.updateChecklistItem(0, "text", "할 일"));

      expect(result.current.hasContent).toBeTruthy();
    });

    it("공백만 있는 경우 falsy", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("title", "   "));

      expect(result.current.hasContent).toBeFalsy();
    });
  });

  describe("filteredChecklist", () => {
    it("TEXT 모드이면 undefined", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      expect(result.current.filteredChecklist).toBeUndefined();
    });

    it("CHECKLIST 모드에서 빈 텍스트 아이템을 필터링한다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.toggleType());
      act(() => result.current.addChecklistItem());
      act(() => result.current.updateChecklistItem(0, "text", "유효"));
      // index 1은 빈 텍스트

      expect(result.current.filteredChecklist).toHaveLength(1);
      expect(result.current.filteredChecklist![0]!.text).toBe("유효");
    });

    it("필터링 후 order가 재인덱싱된다", () => {
      const { result } = renderHook(() => useNoteForm(true, null));

      act(() => result.current.setField("content", "A\nB\nC"));
      act(() => result.current.toggleType());
      // 중간 아이템(B)을 비운다
      act(() => result.current.updateChecklistItem(1, "text", ""));

      expect(result.current.filteredChecklist!.map((i) => i.order)).toEqual([0, 1]);
    });
  });
});
