import { HoBomSchema, type Infer } from "hobom-schema";

export const NoteStatusModel = HoBomSchema.enum(["ACTIVE", "ARCHIVED", "TRASHED"]);
export type NoteStatus = Infer<typeof NoteStatusModel>;

export const NoteTypeModel = HoBomSchema.enum(["TEXT", "CHECKLIST"]);
export type NoteType = Infer<typeof NoteTypeModel>;

export const NoteRecurrenceModel = HoBomSchema.enum(["NONE", "DAILY", "WEEKLY", "MONTHLY"]);
export type NoteRecurrence = Infer<typeof NoteRecurrenceModel>;
