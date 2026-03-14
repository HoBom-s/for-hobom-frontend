import type { NoteItemType } from "@/entities/note";
import type { RawNoteItemType } from "@/entities/note/api/note.type";

export const makeNote = (overrides: Partial<NoteItemType> = {}): NoteItemType => ({
  id: "note-1",
  owner: "user-1",
  title: "Test Note",
  content: "test content",
  type: "TEXT",
  checklistItems: [],
  color: "#ffffff",
  labels: [],
  members: [],
  reminder: null,
  isPinned: false,
  status: "ACTIVE",
  trashedAt: null,
  order: 0,
  ...overrides,
});

export const toRawNote = (note: NoteItemType): RawNoteItemType =>
  ({
    ...note,
    id: { value: note.id },
    owner: { value: note.owner },
    color: { value: note.color },
    labels: note.labels.map((l) => ({ value: l })),
    members: note.members.map((m) => ({ value: m })),
  }) as unknown as RawNoteItemType;
