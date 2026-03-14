import { useCallback, useMemo, useState } from "react";
import { arrayMove, type DragEndEvent, type DragStartEvent } from "@/shared/ui";
import type { NoteItemType } from "@/entities/note";

type Section = "pinned" | "unpinned";

interface UseNoteGridParams {
  pinnedNotes: NoteItemType[];
  otherNotes: NoteItemType[];
  onTogglePin: (id: string) => void;
  onReorder?: (id: string, order: number, reorderedItems: NoteItemType[]) => void;
}

export const useNoteGrid = ({
  pinnedNotes,
  otherNotes,
  onTogglePin,
  onReorder,
}: UseNoteGridParams) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const allNotes = useMemo(() => [...pinnedNotes, ...otherNotes], [pinnedNotes, otherNotes]);

  const activeNote = activeId ? allNotes.find((n) => n.id === activeId) : null;

  const findSection = useCallback(
    (id: string): Section | null => {
      if (pinnedNotes.some((n) => n.id === id)) return "pinned";
      if (otherNotes.some((n) => n.id === id)) return "unpinned";

      return null;
    },
    [pinnedNotes, otherNotes],
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;

      if (!over) return;

      const activeSection = findSection(String(active.id));
      const overSection = findSection(String(over.id));

      if (!activeSection || !overSection) return;

      if (activeSection !== overSection) {
        onTogglePin(String(active.id));
      } else if (active.id !== over.id && onReorder) {
        const notes = activeSection === "pinned" ? pinnedNotes : otherNotes;
        const oldIndex = notes.findIndex((n) => n.id === active.id);
        const newIndex = notes.findIndex((n) => n.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        const reordered = arrayMove(notes, oldIndex, newIndex);

        onReorder(String(active.id), newIndex, reordered);
      }
    },
    [findSection, onTogglePin, onReorder, pinnedNotes, otherNotes],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    activeId,
    activeNote,
    allNotes,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
