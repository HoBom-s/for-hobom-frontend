import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { NOTE_COLORS, useCreateNote, useUpdateNote } from "@/entities/note";
import type { NoteItemType } from "@/entities/note";
import { labelQueries } from "@/entities/label";
import { useNoteForm } from "./useNoteForm";

interface UseNoteEditFormParams {
  open: boolean;
  note: NoteItemType | null;
  onClose: () => void;
}

export const useNoteEditForm = ({
  open,
  note,
  onClose,
}: UseNoteEditFormParams) => {
  const isEdit = !!note;

  const noteForm = useNoteForm(open, note);
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const { data: labelsData } = useQuery({
    ...labelQueries.list(),
    enabled: open,
  });
  const availableLabels = useMemo(
    () => labelsData?.items ?? [],
    [labelsData?.items],
  );
  const selectedLabelIds = useMemo(
    () => new Set(noteForm.form.labels),
    [noteForm.form.labels],
  );
  const labelMap = useMemo(
    () => Object.fromEntries(availableLabels.map((l) => [l.id, l.title])),
    [availableLabels],
  );

  const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);
  const [labelAnchor, setLabelAnchor] = useState<HTMLElement | null>(null);
  const [reminderAnchor, setReminderAnchor] = useState<HTMLElement | null>(
    null,
  );

  const handleSave = () => {
    if (!noteForm.hasContent) {
      onClose();
      return;
    }

    if (isEdit && note) {
      updateNote.mutate(
        {
          id: note.id.value,
          title: noteForm.form.title,
          content:
            noteForm.form.type === "TEXT" ? noteForm.form.content : undefined,
          checklistItems: noteForm.filteredChecklist,
          color: noteForm.form.color,
          labels: noteForm.form.labels,
          reminder: noteForm.form.reminder,
        },
        { onSuccess: onClose },
      );
    } else {
      createNote.mutate(
        {
          title: noteForm.form.title || undefined,
          content:
            noteForm.form.type === "TEXT"
              ? noteForm.form.content || undefined
              : undefined,
          type: noteForm.form.type,
          checklistItems: noteForm.filteredChecklist,
          color:
            noteForm.form.color !== NOTE_COLORS.DEFAULT
              ? noteForm.form.color
              : undefined,
          labels:
            noteForm.form.labels.length > 0 ? noteForm.form.labels : undefined,
          reminder: noteForm.form.reminder ?? undefined,
        },
        { onSuccess: onClose },
      );
    }
  };

  return {
    isEdit,
    ...noteForm,
    availableLabels,
    selectedLabelIds,
    labelMap,
    colorAnchor,
    setColorAnchor,
    labelAnchor,
    setLabelAnchor,
    reminderAnchor,
    setReminderAnchor,
    handleSave,
    isPending: createNote.isPending || updateNote.isPending,
  };
};
