import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useToggleNotePin,
  useUpdateNoteStatus,
  useDeleteNote,
  useReorderNote,
} from "@/entities/note";
import type { NoteItemType, NoteStatus } from "@/entities/note";
import { labelQueries } from "@/entities/label";
import { useNoteList } from "./useNoteList";

export const useNoteContent = (status: NoteStatus | undefined) => {
  const effectiveStatus = status === undefined ? "ACTIVE" : status;
  const { pinnedNotes, otherNotes } = useNoteList(effectiveStatus);

  const togglePin = useToggleNotePin(effectiveStatus);
  const updateStatus = useUpdateNoteStatus();
  const deleteNote = useDeleteNote();
  const reorderNote = useReorderNote(effectiveStatus);

  const { data: labelsData } = useQuery(labelQueries.list());
  const labelMap = useMemo(() => {
    const items = labelsData?.items ?? [];
    return Object.fromEntries(items.map((l) => [l.id, l.title]));
  }, [labelsData]);

  const [editNote, setEditNote] = useState<NoteItemType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openEdit = (note: NoteItemType) => {
    setEditNote(note);
    setDialogOpen(true);
  };

  const openCreate = () => {
    setEditNote(null);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  return {
    pinnedNotes,
    otherNotes,
    labelMap,
    editNote,
    dialogOpen,
    openEdit,
    openCreate,
    closeDialog,
    togglePin: (id: string) => togglePin.mutate({ id }),
    updateStatus: (id: string, s: NoteStatus) =>
      updateStatus.mutate({ id, status: s }),
    deleteNote: (id: string) => deleteNote.mutate({ id }),
    reorderNote: (id: string, order: number, reorderedItems: NoteItemType[]) =>
      reorderNote.mutate({ id, order, reorderedItems }),
  };
};
