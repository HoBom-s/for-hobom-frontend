import { Suspense, useMemo, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  useToggleNotePin,
  useUpdateNoteStatus,
  useDeleteNote,
  useReorderNote,
} from "@/entities/note";
import type { NoteItemType, NoteStatus } from "@/entities/note";
import { labelQueries } from "@/entities/label";
import {
  useNoteList,
  NoteGrid,
  NoteCreateBar,
  NoteEditDialog,
  NoteStatusTabs,
  NoteTrashActions,
} from "@/features/note";

const NoteContent = ({ status }: { status: NoteStatus | undefined }) => {
  const { pinnedNotes, otherNotes } = useNoteList(
    status === undefined ? "ACTIVE" : status,
  );
  const togglePin = useToggleNotePin(status === undefined ? "ACTIVE" : status);
  const updateStatus = useUpdateNoteStatus();
  const deleteNote = useDeleteNote();
  const reorderNote = useReorderNote(status === undefined ? "ACTIVE" : status);

  const { data: labelsData } = useQuery(labelQueries.list());
  const labelMap = useMemo(() => {
    const items = labelsData?.items ?? [];
    return Object.fromEntries(items.map((l) => [l.id, l.title]));
  }, [labelsData]);

  const [editNote, setEditNote] = useState<NoteItemType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNoteClick = (note: NoteItemType) => {
    setEditNote(note);
    setDialogOpen(true);
  };

  const handleCreateClick = () => {
    setEditNote(null);
    setDialogOpen(true);
  };

  return (
    <>
      {status !== "TRASHED" && status !== "ARCHIVED" && (
        <NoteCreateBar onClick={handleCreateClick} />
      )}

      {status === "TRASHED" && <NoteTrashActions />}

      <NoteGrid
        pinnedNotes={pinnedNotes}
        otherNotes={otherNotes}
        labelMap={labelMap}
        onNoteClick={handleNoteClick}
        onTogglePin={(id) => togglePin.mutate({ id })}
        onStatusChange={(id, s) => updateStatus.mutate({ id, status: s })}
        onDelete={(id) => deleteNote.mutate({ id })}
        onReorder={(id, order, reorderedItems) =>
          reorderNote.mutate({ id, order, reorderedItems })
        }
      />

      <NoteEditDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        note={editNote}
      />
    </>
  );
};

export const NoteWorkspace = () => {
  const [status, setStatus] = useState<NoteStatus | undefined>(undefined);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <NoteStatusTabs value={status} onChange={setStatus} />

      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <NoteContent status={status} />
      </Suspense>
    </Box>
  );
};
