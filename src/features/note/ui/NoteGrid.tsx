import { Box, Typography } from "@mui/material";
import { DragIndicatorOutlined, LightbulbOutlined } from "@mui/icons-material";
import { Bom } from "@/packages/bom";
import { Sortable } from "@/shared/ui";
import { NoteCard } from "@/entities/note";
import type { NoteItemType, NoteStatus } from "@/entities/note";
import { useNoteGrid } from "../model/useNoteGrid";

const CARD_WIDTH = 240;
const GAP = 12;

const SECTION_HEADER_SX = {
  color: "text.secondary",
  fontWeight: 500,
  fontSize: "0.6875rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  mb: 1,
  display: "block",
} as const;

const PLACEHOLDER_STYLE: React.CSSProperties = {
  border: "2px dashed var(--mui-palette-divider)",
  borderRadius: 8,
  backgroundColor: "var(--mui-palette-action-hover)",
};

const OVER_STYLE: React.CSSProperties = {
  boxShadow: "inset 0 0 0 2px #4680ff",
  borderRadius: 8,
};

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

const NoteItem = ({
  note,
  labelMap,
  onNoteClick,
  onTogglePin,
  onStatusChange,
  onDelete,
}: {
  note: NoteItemType;
  labelMap?: Record<string, string>;
  onNoteClick: (note: NoteItemType) => void;
  onTogglePin: (id: string) => void;
  onStatusChange: (id: string, status: NoteStatus) => void;
  onDelete: (id: string) => void;
}) => (
  <Sortable.Item
    id={note.id}
    style={{ width: CARD_WIDTH }}
    useHandle
    placeholderStyle={PLACEHOLDER_STYLE}
    overStyle={OVER_STYLE}
  >
    <NoteCard
      note={note}
      labelMap={labelMap}
      onClick={onNoteClick}
      onTogglePin={onTogglePin}
      onStatusChange={onStatusChange}
      onDelete={onDelete}
      dragHandle={
        <Sortable.Handle>
          <DragIndicatorOutlined sx={{ fontSize: 18 }} />
        </Sortable.Handle>
      }
    />
  </Sortable.Item>
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
  const { activeNote, handleDragStart, handleDragEnd, handleDragCancel } =
    useNoteGrid({ pinnedNotes, otherNotes, onTogglePin, onReorder });

  const sharedProps = {
    labelMap,
    onNoteClick,
    onTogglePin,
    onStatusChange,
    onDelete,
  };

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
          sx={{ fontSize: 96, color: "action.disabled", strokeWidth: 0.5 }}
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
    <Sortable.Root
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      overlay={
        activeNote && (
          <Box
            sx={{
              width: CARD_WIDTH,
              transform: "scale(1.03)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              borderRadius: 2,
            }}
          >
            <NoteCard
              note={activeNote}
              labelMap={labelMap}
              onClick={() => {}}
              onTogglePin={() => {}}
              onStatusChange={() => {}}
              onDelete={() => {}}
            />
          </Box>
        )
      }
    >
      <Box>
        {!Bom.isEmpty(pinnedNotes) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={SECTION_HEADER_SX}>
              고정됨
            </Typography>
            <Sortable.List items={pinnedNotes.map((n) => n.id)}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: `${GAP}px` }}>
                {pinnedNotes.map((note) => (
                  <NoteItem key={note.id} note={note} {...sharedProps} />
                ))}
              </Box>
            </Sortable.List>
          </Box>
        )}

        {!Bom.isEmpty(otherNotes) && (
          <Box>
            {!Bom.isEmpty(pinnedNotes) && (
              <Typography
                variant="caption"
                sx={{ ...SECTION_HEADER_SX, mt: 1 }}
              >
                기타
              </Typography>
            )}
            <Sortable.List items={otherNotes.map((n) => n.id)}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: `${GAP}px` }}>
                {otherNotes.map((note) => (
                  <NoteItem key={note.id} note={note} {...sharedProps} />
                ))}
              </Box>
            </Sortable.List>
          </Box>
        )}
      </Box>
    </Sortable.Root>
  );
};
