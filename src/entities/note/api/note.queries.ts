import { queryOptions } from "@tanstack/react-query";
import { fetchNotes, fetchNoteById } from "./note.api";
import type { NoteStatus } from "../model/note.model";

export const noteQueries = {
  notes: () => ["notes"],

  list: (status?: NoteStatus) =>
    queryOptions({
      queryKey: ["notes", status ?? "ALL"],
      queryFn: () => fetchNotes(status),
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["notes", "detail", id],
      queryFn: () => fetchNoteById({ id }),
    }),
} as const;
