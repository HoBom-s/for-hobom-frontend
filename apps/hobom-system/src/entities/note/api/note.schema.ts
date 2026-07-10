import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { ChecklistItemType, ReminderType, RawNoteItemType } from "./note.type";

const checklistItemSchema: Schema<ChecklistItemType> = HoBomSchema.object({
  text: HoBomSchema.string(),
  checked: HoBomSchema.boolean(),
  order: HoBomSchema.number(),
});

const reminderSchema: Schema<ReminderType> = HoBomSchema.object({
  date: HoBomSchema.date(),
  recurrence: HoBomSchema.enum(["NONE", "DAILY", "WEEKLY", "MONTHLY"]),
});

/** `RawNoteItemType` (VO 래핑 원본) 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const rawNoteItemSchema: Schema<RawNoteItemType> = HoBomSchema.object({
  id: HoBomSchema.object({ value: HoBomSchema.string() }),
  owner: HoBomSchema.object({ value: HoBomSchema.string() }),
  title: HoBomSchema.string(),
  content: HoBomSchema.string(),
  type: HoBomSchema.enum(["TEXT", "CHECKLIST"]),
  checklistItems: HoBomSchema.array(checklistItemSchema),
  color: HoBomSchema.object({ value: HoBomSchema.string() }),
  labels: HoBomSchema.array(HoBomSchema.object({ value: HoBomSchema.string() })),
  reminder: reminderSchema.nullable(),
  members: HoBomSchema.array(HoBomSchema.object({ value: HoBomSchema.string() })),
  isPinned: HoBomSchema.boolean(),
  status: HoBomSchema.enum(["ACTIVE", "ARCHIVED", "TRASHED"]),
  trashedAt: HoBomSchema.date().nullable(),
  order: HoBomSchema.number(),
});

export const rawNoteItemsSchema: Schema<RawNoteItemType[]> = HoBomSchema.array(rawNoteItemSchema);
