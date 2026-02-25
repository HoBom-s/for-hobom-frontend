import type { NoteStatus, NoteType, NoteRecurrence } from "../model/note.model";

export interface ChecklistItemType {
  text: string;
  checked: boolean;
  order: number;
}

export interface ReminderType {
  date: string;
  recurrence: NoteRecurrence;
}

/**
 * 서버 응답 형태.
 * id, owner, color, labels는 VO 래핑 ({ value: T }).
 * title, content, type 등은 plain string.
 */
export interface NoteItemType {
  id: { value: string };
  owner: { value: string };
  title: string;
  content: string;
  type: NoteType;
  checklistItems: ChecklistItemType[];
  color: { value: string };
  labels: { value: string }[];
  reminder: ReminderType | null;
  isPinned: boolean;
  status: NoteStatus;
  trashedAt: string | null;
  order: number;
}

export interface CreateNoteRequest {
  title?: string;
  content?: string;
  type: NoteType;
  checklistItems?: ChecklistItemType[];
  color?: string;
  labels?: string[];
  reminder?: ReminderType;
}

export interface UpdateNoteRequest {
  title?: string | null;
  content?: string | null;
  checklistItems?: ChecklistItemType[];
  color?: string;
  labels?: string[];
  reminder?: ReminderType | null;
}

export interface UpdateNoteStatusRequest {
  status: NoteStatus;
}

export interface ReorderNoteRequest {
  order: number;
}
