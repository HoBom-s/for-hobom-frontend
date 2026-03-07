import type { NoteStatus } from "@/entities/note";
import { useNoteContent } from "../model/useNoteContent";
import { NoteGrid } from "./NoteGrid";
import { NoteCreateBar } from "./NoteCreateBar";
import { NoteEditDialog } from "./NoteEditDialog";
import { NoteTrashActions } from "./NoteTrashActions";

export const NoteContent = ({ status }: { status: NoteStatus | undefined }) => {
  const {
    pinnedNotes,
    otherNotes,
    labelMap,
    editNote,
    dialogOpen,
    openEdit,
    openCreate,
    closeDialog,
    togglePin,
    updateStatus,
    deleteNote,
    reorderNote,
  } = useNoteContent(status);

  return (
    <>
      {status !== "TRASHED" && status !== "ARCHIVED" && (
        <NoteCreateBar onClick={openCreate} />
      )}

      {status === "TRASHED" && <NoteTrashActions />}

      <NoteGrid
        pinnedNotes={pinnedNotes}
        otherNotes={otherNotes}
        labelMap={labelMap}
        onNoteClick={openEdit}
        onTogglePin={togglePin}
        onStatusChange={updateStatus}
        onDelete={deleteNote}
        onReorder={reorderNote}
      />

      <NoteEditDialog open={dialogOpen} onClose={closeDialog} note={editNote} />
    </>
  );
};
