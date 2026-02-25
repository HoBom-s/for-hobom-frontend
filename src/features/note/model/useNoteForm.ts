import { useState, useEffect, useCallback, useMemo } from "react";
import { Bom } from "@/packages/bom";
import { NOTE_COLORS } from "@/entities/note";
import type {
  NoteItemType,
  NoteType,
  ChecklistItemType,
  ReminderType,
  NoteRecurrence,
} from "@/entities/note";
import {
  toChecklistItem,
  textToChecklist,
  checklistToText,
  reindex,
  fromNote,
} from "../lib/note-form.lib";

export interface NoteFormState {
  title: string;
  content: string;
  type: NoteType;
  checklistItems: ChecklistItemType[];
  color: string;
  labels: string[];
  reminder: ReminderType | null;
}

const INITIAL_STATE: NoteFormState = {
  title: "",
  content: "",
  type: "TEXT",
  checklistItems: [],
  color: NOTE_COLORS.DEFAULT,
  labels: [],
  reminder: null,
};

const update =
  (fn: (prev: NoteFormState) => Partial<NoteFormState>) =>
  (prev: NoteFormState): NoteFormState => ({ ...prev, ...fn(prev) });

export const useNoteForm = (open: boolean, note: NoteItemType | null) => {
  const [form, setForm] = useState<NoteFormState>(INITIAL_STATE);

  useEffect(() => {
    if (!open) return;
    setForm(note ? fromNote(note) : INITIAL_STATE);
  }, [open, note]);

  const setField = useCallback(
    <K extends keyof NoteFormState>(key: K, value: NoteFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const toggleType = useCallback(() => {
    setForm(
      update((prev) =>
        prev.type === "TEXT"
          ? {
              type: "CHECKLIST" as const,
              checklistItems: prev.content.trim()
                ? textToChecklist(prev.content)
                : [toChecklistItem("", 0)],
              content: "",
            }
          : {
              type: "TEXT" as const,
              content: checklistToText(prev.checklistItems),
              checklistItems: [],
            },
      ),
    );
  }, []);

  const addChecklistItem = useCallback(() => {
    setForm(
      update((prev) => ({
        checklistItems: [
          ...prev.checklistItems,
          toChecklistItem("", prev.checklistItems.length),
        ],
      })),
    );
  }, []);

  const updateChecklistItem = useCallback(
    (
      index: number,
      field: keyof ChecklistItemType,
      value: string | boolean | number,
    ) => {
      setForm(
        update((prev) => ({
          checklistItems: Bom.pipe(
            prev.checklistItems,
            Bom.map((item, i) =>
              i === index ? { ...item, [field]: value } : item,
            ),
          ),
        })),
      );
    },
    [],
  );

  const removeChecklistItem = useCallback((index: number) => {
    setForm(
      update((prev) => ({
        checklistItems: Bom.pipe(
          prev.checklistItems,
          Bom.filter((_, i) => i !== index),
        ),
      })),
    );
  }, []);

  const toggleLabel = useCallback((labelId: string) => {
    setForm(
      update((prev) => ({
        labels: prev.labels.includes(labelId)
          ? Bom.pipe(
              prev.labels,
              Bom.filter((l) => l !== labelId),
            )
          : [...prev.labels, labelId],
      })),
    );
  }, []);

  const setReminder = useCallback(
    (date: string, recurrence: NoteRecurrence) => {
      setForm(
        update(() => ({
          reminder: { date: new Date(date).toISOString(), recurrence },
        })),
      );
    },
    [],
  );

  const clearReminder = useCallback(() => {
    setForm(update(() => ({ reminder: null })));
  }, []);

  const hasContent =
    form.title.trim() ||
    form.content.trim() ||
    Bom.some(form.checklistItems, (item) => item.text.trim() !== "");

  const filteredChecklist = useMemo(
    () =>
      form.type === "CHECKLIST"
        ? Bom.pipe(
            form.checklistItems,
            Bom.filter((item) => item.text.trim() !== ""),
            reindex,
          )
        : undefined,
    [form.type, form.checklistItems],
  );

  return {
    form,
    setField,
    toggleType,
    addChecklistItem,
    updateChecklistItem,
    removeChecklistItem,
    toggleLabel,
    setReminder,
    clearReminder,
    hasContent,
    filteredChecklist,
  };
};
