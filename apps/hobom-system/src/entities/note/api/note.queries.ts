import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchNotes, fetchNoteById } from "./note.api";
import type { NoteStatus } from "../model/note.model";

export const noteQueries = {
  notes: () => ["notes"],

  list: (status?: NoteStatus) =>
    queryOptions({
      queryKey: ["notes", status ?? "ALL"],
      queryFn: ({ signal }) => fetchNotes(status, signal),
      ...CACHE_PROFILE.MODERATE,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["notes", "detail", id],
      queryFn: ({ signal }) => fetchNoteById({ id }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
