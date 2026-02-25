import { useSuspenseQuery } from "@tanstack/react-query";
import { noteQueries } from "@/entities/note";
import type { NoteStatus } from "@/entities/note";
import { partitionNotes } from "../lib/partition-notes";

export const useNoteList = (status?: NoteStatus) => {
  const { data } = useSuspenseQuery(noteQueries.list(status));
  const notes = data.items ?? [];

  const { pinnedNotes, otherNotes } = partitionNotes(notes);

  return { notes, pinnedNotes, otherNotes };
};
