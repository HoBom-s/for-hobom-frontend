import { Bom } from "@/packages/bom";
import { unwrapVO } from "@/shared/lib";
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

export const textToChecklist = (content: string): ChecklistItemType[] =>
  Bom.pipe(
    content.split("\n"),
    Bom.filter((line) => line.trim() !== ""),
    Bom.map((text, i) => toChecklistItem(text, i)),
  );

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

export const fromNote = (note: NoteItemType): NoteFormState => ({
  title: note.title,
  content: note.content,
  type: resolveFormType(note),
  checklistItems: note.checklistItems ?? [],
  color: unwrapVO(note.color) || NOTE_COLORS.DEFAULT,
  labels: Bom.pipe(
    note.labels ?? [],
    Bom.map((l) => l.value),
  ),
  reminder: note.reminder,
});
