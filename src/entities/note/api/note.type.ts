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
 * 서버 응답 원본 (VO 래핑).
 * API 경계에서 normalizeNote로 변환되므로 외부에 노출하지 않는다.
 */
export interface RawNoteItemType {
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

/**
 * 정규화된 NoteItemType — VO 래핑 해제.
 */
export interface NoteItemType {
  id: string;
  owner: string;
  title: string;
  content: string;
  type: NoteType;
  checklistItems: ChecklistItemType[];
  color: string;
  labels: string[];
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
