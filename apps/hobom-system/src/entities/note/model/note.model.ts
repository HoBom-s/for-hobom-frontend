import { z } from "zod";

export const NoteStatusModel = z.enum(["ACTIVE", "ARCHIVED", "TRASHED"]);
export type NoteStatus = z.infer<typeof NoteStatusModel>;

export const NoteTypeModel = z.enum(["TEXT", "CHECKLIST"]);
export type NoteType = z.infer<typeof NoteTypeModel>;

export const NoteRecurrenceModel = z.enum(["NONE", "DAILY", "WEEKLY", "MONTHLY"]);
export type NoteRecurrence = z.infer<typeof NoteRecurrenceModel>;
