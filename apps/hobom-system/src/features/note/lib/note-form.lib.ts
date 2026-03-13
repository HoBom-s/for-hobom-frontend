import { Bom } from "hobom-utils";
import { NOTE_COLORS } from "@/entities/note";
import type { NoteItemType, ChecklistItemType } from "@/entities/note";
import type { NoteFormState } from "../model/useNoteForm";

export const toChecklistItem = (
  text: string,
  order: number,
): ChecklistItemType => ({
  text,
  checked: false,
  order,
});

/** 줄바꿈 구분 텍스트를 체크리스트 아이템 배열로 변환. 빈 줄은 무시한다. */
export const textToChecklist = (content: string): ChecklistItemType[] =>
  Bom.pipe(
    content.split("\n"),
    Bom.filter((line) => line.trim() !== ""),
    Bom.map((text, i) => toChecklistItem(text, i)),
  );

/** 체크리스트 아이템 배열을 줄바꿈 구분 텍스트로 변환. `textToChecklist`의 역변환. */
export const checklistToText = (items: ChecklistItemType[]): string =>
  Bom.pipe(
    items,
    Bom.map((item) => item.text),
  ).join("\n");

export const reindex = (items: ChecklistItemType[]): ChecklistItemType[] =>
  Bom.pipe(
    items,
    Bom.map((item, i) => ({ ...item, order: i })),
  );

/**
 * 서버 응답에서 type이 "TEXT"여도 checklistItems가 있으면 CHECKLIST로 간주.
 * 실제 서버의 type 필드는 신뢰하지 않고, 데이터 기반으로 판별한다.
 */
const resolveFormType = (note: NoteItemType): "TEXT" | "CHECKLIST" =>
  note.checklistItems?.length > 0 ? "CHECKLIST" : "TEXT";

/**
 * 서버 응답 NoteItemType을 폼 상태로 변환한다.
 * 서버의 `type` 필드는 신뢰하지 않고, `checklistItems` 유무로 TEXT/CHECKLIST를 판별한다.
 */
export const fromNote = (note: NoteItemType): NoteFormState => ({
  title: note.title,
  content: note.content,
  type: resolveFormType(note),
  checklistItems: note.checklistItems ?? [],
  color: note.color || NOTE_COLORS.DEFAULT,
  labels: note.labels ?? [],
  reminder: note.reminder,
});
