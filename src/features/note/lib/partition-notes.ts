import type { NoteItemType } from "@/entities/note";

export const partitionNotes = (notes: NoteItemType[]) => {
  const byOrder = (a: NoteItemType, b: NoteItemType) => a.order - b.order;
  const pinnedNotes = notes.filter((n) => n.isPinned).sort(byOrder);
  const otherNotes = notes.filter((n) => !n.isPinned).sort(byOrder);

  return { pinnedNotes, otherNotes };
};
