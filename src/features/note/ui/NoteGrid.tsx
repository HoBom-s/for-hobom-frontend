import { useCallback, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DragIndicatorOutlined, LightbulbOutlined } from "@mui/icons-material";
import { Bom } from "@/packages/bom";
import {
  Sortable,
  arrayMove,
  type DragEndEvent,
  type DragStartEvent,
} from "@/shared/ui";
import { NoteCard } from "@/entities/note";
import type { NoteItemType, NoteStatus } from "@/entities/note";

const CARD_WIDTH = 240;
const GAP = 12;

const PLACEHOLDER_STYLE: React.CSSProperties = {
  border: "2px dashed #e0e0e0",
  borderRadius: 8,
  backgroundColor: "#fafafa",
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

type Section = "pinned" | "unpinned";

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
    id={note.id.value}
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
  const [activeId, setActiveId] = useState<string | null>(null);

  const allNotes = useMemo(
    () => [...pinnedNotes, ...otherNotes],
    [pinnedNotes, otherNotes],
  );

  const activeNote = activeId
    ? allNotes.find((n) => n.id.value === activeId)
    : null;

  const findSection = useCallback(
    (id: string): Section | null => {
      if (pinnedNotes.some((n) => n.id.value === id)) return "pinned";
      if (otherNotes.some((n) => n.id.value === id)) return "unpinned";
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
        // 섹션 간 이동 → 핀 토글
        onTogglePin(String(active.id));
      } else if (active.id !== over.id && onReorder) {
        // 같은 섹션 내 정렬
        const notes = activeSection === "pinned" ? pinnedNotes : otherNotes;
        const oldIndex = notes.findIndex((n) => n.id.value === active.id);
        const newIndex = notes.findIndex((n) => n.id.value === over.id);
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
            <Sortable.List items={pinnedNotes.map((n) => n.id.value)}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: `${GAP}px` }}>
                {pinnedNotes.map((note) => (
                  <NoteItem key={note.id.value} note={note} {...sharedProps} />
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
            <Sortable.List items={otherNotes.map((n) => n.id.value)}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: `${GAP}px` }}>
                {otherNotes.map((note) => (
                  <NoteItem key={note.id.value} note={note} {...sharedProps} />
                ))}
              </Box>
            </Sortable.List>
          </Box>
        )}
      </Box>
    </Sortable.Root>
  );
};
