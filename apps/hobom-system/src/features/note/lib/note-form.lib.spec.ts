import { describe, it, expect } from "vitest";
import type { NoteItemType, ChecklistItemType } from "@/entities/note";
import {
  toChecklistItem,
  textToChecklist,
  checklistToText,
  reindex,
  fromNote,
} from "./note-form.lib";

describe("toChecklistItem", () => {
  it("기본 체크리스트 아이템을 생성한다", () => {
    expect(toChecklistItem("할 일", 3)).toEqual({
      text: "할 일",
      checked: false,
      order: 3,
    });
  });

  it("빈 텍스트로도 생성할 수 있다", () => {
    expect(toChecklistItem("", 0)).toEqual({
      text: "",
      checked: false,
      order: 0,
    });
  });
});

describe("textToChecklist", () => {
  it("줄바꿈으로 분리된 텍스트를 체크리스트로 변환한다", () => {
    const result = textToChecklist("사과\n바나나\n포도");

    expect(result).toEqual([
      { text: "사과", checked: false, order: 0 },
      { text: "바나나", checked: false, order: 1 },
      { text: "포도", checked: false, order: 2 },
    ]);
  });

  it("빈 줄을 필터링한다", () => {
    const result = textToChecklist("사과\n\n\n바나나");

    expect(result).toHaveLength(2);
    expect(result[0]!.text).toBe("사과");
    expect(result[1]!.text).toBe("바나나");
  });

  it("공백만 있는 줄을 필터링한다", () => {
    const result = textToChecklist("사과\n   \n바나나");

    expect(result).toHaveLength(2);
  });

  it("빈 문자열이면 빈 배열을 반환한다", () => {
    expect(textToChecklist("")).toEqual([]);
  });

  it("공백만 있는 문자열이면 빈 배열을 반환한다", () => {
    expect(textToChecklist("   \n  \n ")).toEqual([]);
  });

  it("order가 0부터 순차적으로 매겨진다", () => {
    const result = textToChecklist("A\nB\nC");

    expect(result.map((r) => r.order)).toEqual([0, 1, 2]);
  });
});

describe("checklistToText", () => {
  it("체크리스트 아이템을 줄바꿈 텍스트로 변환한다", () => {
    const items: ChecklistItemType[] = [
      { text: "사과", checked: true, order: 0 },
      { text: "바나나", checked: false, order: 1 },
    ];

    expect(checklistToText(items)).toBe("사과\n바나나");
  });

  it("빈 배열이면 빈 문자열을 반환한다", () => {
    expect(checklistToText([])).toBe("");
  });

  it("checked 상태는 무시하고 text만 결합한다", () => {
    const items: ChecklistItemType[] = [
      { text: "완료됨", checked: true, order: 0 },
      { text: "미완료", checked: false, order: 1 },
    ];

    expect(checklistToText(items)).toBe("완료됨\n미완료");
  });
});

describe("reindex", () => {
  it("order를 0부터 재매핑한다", () => {
    const items: ChecklistItemType[] = [
      { text: "A", checked: false, order: 5 },
      { text: "B", checked: true, order: 10 },
      { text: "C", checked: false, order: 99 },
    ];
    const result = reindex(items);

    expect(result.map((r) => r.order)).toEqual([0, 1, 2]);
  });

  it("기존 text/checked는 보존한다", () => {
    const items: ChecklistItemType[] = [{ text: "할 일", checked: true, order: 7 }];
    const result = reindex(items);

    expect(result[0]).toEqual({ text: "할 일", checked: true, order: 0 });
  });

  it("빈 배열이면 빈 배열을 반환한다", () => {
    expect(reindex([])).toEqual([]);
  });
});

describe("fromNote", () => {
  const baseNote: NoteItemType = {
    id: "note-1",
    owner: "owner-1",
    title: "제목",
    content: "내용",
    type: "TEXT",
    checklistItems: [],
    color: "#fff475",
    labels: ["label-1", "label-2"],
    members: [],
    reminder: null,
    isPinned: false,
    status: "ACTIVE",
    trashedAt: null,
    order: 0,
  };

  it("TEXT 노트를 폼 상태로 변환한다", () => {
    const result = fromNote(baseNote);

    expect(result).toEqual({
      title: "제목",
      content: "내용",
      type: "TEXT",
      checklistItems: [],
      color: "#fff475",
      labels: ["label-1", "label-2"],
      reminder: null,
    });
  });

  it("checklistItems가 있으면 type을 CHECKLIST로 판별한다", () => {
    const note: NoteItemType = {
      ...baseNote,
      type: "TEXT",
      checklistItems: [{ text: "체크", checked: true, order: 0 }],
    };
    const result = fromNote(note);

    expect(result.type).toBe("CHECKLIST");
    expect(result.checklistItems).toEqual([{ text: "체크", checked: true, order: 0 }]);
  });

  it("color가 빈 문자열이면 DEFAULT 색상을 사용한다", () => {
    const note: NoteItemType = {
      ...baseNote,
      color: "",
    };

    expect(fromNote(note).color).toBe("#ffffff");
  });

  it("labels가 없으면 빈 배열을 반환한다", () => {
    const note: NoteItemType = {
      ...baseNote,
      labels: [],
    };

    expect(fromNote(note).labels).toEqual([]);
  });

  it("reminder가 있으면 그대로 전달한다", () => {
    const reminder = {
      date: "2026-03-01T00:00:00Z",
      recurrence: "WEEKLY" as const,
    };
    const note: NoteItemType = { ...baseNote, reminder };

    expect(fromNote(note).reminder).toEqual(reminder);
  });
});
