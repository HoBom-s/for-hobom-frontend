import { useSuspenseQuery } from "hobom-data";
import { noteQueries } from "@/entities/note";
import type { NoteStatus } from "@/entities/note";
import { partitionNotesLib } from "../lib/partition-notes.lib.ts";

export const useNoteList = (status?: NoteStatus) => {
  const { data } = useSuspenseQuery(noteQueries.list(status));
  const notes = data.items ?? [];

  const { pinnedNotes, otherNotes } = partitionNotesLib(notes);

  return { notes, pinnedNotes, otherNotes };
};
