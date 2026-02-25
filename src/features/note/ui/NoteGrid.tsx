import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { LightbulbOutlined } from "@mui/icons-material";
import { Bom } from "@/packages/bom";
import { Sortable, arrayMove, type DragEndEvent } from "@/shared/ui";
import { NoteCard } from "@/entities/note";
import type { NoteItemType, NoteStatus } from "@/entities/note";

const CARD_WIDTH = 240;
const GAP = 12;

interface NoteGridProps {
  pinnedNotes: NoteItemType[];
  otherNotes: NoteItemType[];
  labelMap?: Record<string, string>;
  onNoteClick: (note: NoteItemType) => void;
  onTogglePin: (id: string) => void;
  onStatusChange: (id: string, status: NoteStatus) => void;
  onDelete: (id: string) => void;
  onReorder?: (
    id: string,
    order: number,
    reorderedItems: NoteItemType[],
  ) => void;
}

const SortableGrid = ({
  notes,
  labelMap,
  onNoteClick,
  onTogglePin,
  onStatusChange,
  onDelete,
  onDragEnd,
}: {
  notes: NoteItemType[];
  labelMap?: Record<string, string>;
  onNoteClick: (note: NoteItemType) => void;
  onTogglePin: (id: string) => void;
  onStatusChange: (id: string, status: NoteStatus) => void;
  onDelete: (id: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
}) => (
  <Sortable.Root onDragEnd={onDragEnd}>
    <Sortable.List items={notes.map((n) => n.id.value)}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: `${GAP}px` }}>
        {notes.map((note) => (
          <Sortable.Item
            key={note.id.value}
            id={note.id.value}
            style={{ width: CARD_WIDTH }}
          >
            <NoteCard
              note={note}
              labelMap={labelMap}
              onClick={onNoteClick}
              onTogglePin={onTogglePin}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          </Sortable.Item>
        ))}
      </Box>
    </Sortable.List>
  </Sortable.Root>
);

export const NoteGrid = ({
  pinnedNotes,
  otherNotes,
  labelMap,
  onNoteClick,
  onTogglePin,
  onStatusChange,
  onDelete,
  onReorder,
}: NoteGridProps) => {
  const sharedProps = {
    labelMap,
    onNoteClick,
    onTogglePin,
    onStatusChange,
    onDelete,
  };

  const createDragEndHandler = useCallback(
    (notes: NoteItemType[]) => (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id || !onReorder) return;

      const oldIndex = notes.findIndex((n) => n.id.value === active.id);
      const newIndex = notes.findIndex((n) => n.id.value === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(notes, oldIndex, newIndex);

      onReorder(String(active.id), newIndex, reordered);
    },
    [onReorder],
  );

  if (Bom.isEmpty(pinnedNotes) && Bom.isEmpty(otherNotes)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 280,
          gap: 1.5,
        }}
      >
        <LightbulbOutlined
          sx={{ fontSize: 96, color: "#dadce0", strokeWidth: 0.5 }}
        />
        <Typography
          variant="body1"
          sx={{ color: "text.disabled", fontSize: "1rem", fontWeight: 400 }}
        >
          추가한 메모가 여기에 표시됩니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {!Bom.isEmpty(pinnedNotes) && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              fontSize: "0.6875rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              mb: 1,
              display: "block",
            }}
          >
            고정됨
          </Typography>
          <SortableGrid
            notes={pinnedNotes}
            {...sharedProps}
            onDragEnd={createDragEndHandler(pinnedNotes)}
          />
        </Box>
      )}

      {!Bom.isEmpty(otherNotes) && (
        <Box>
          {!Bom.isEmpty(pinnedNotes) && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.6875rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                mb: 1,
                mt: 1,
                display: "block",
              }}
            >
              기타
            </Typography>
          )}
          <SortableGrid
            notes={otherNotes}
            {...sharedProps}
            onDragEnd={createDragEndHandler(otherNotes)}
          />
        </Box>
      )}
    </Box>
  );
};
