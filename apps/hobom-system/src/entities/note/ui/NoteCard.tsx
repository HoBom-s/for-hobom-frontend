import { type ReactNode, useState } from "react";
import {
  PushPin,
  PushPinOutlined,
  ArchiveOutlined,
  UnarchiveOutlined,
  DeleteOutlined,
  RestoreFromTrashOutlined,
  NotificationsActiveOutlined,
  PeopleOutlined,
} from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import type { NoteItemType } from "../api/note.type";
import type { NoteStatus } from "../model/note.model";

const META_CHIP_SX = {
  height: 24,
  fontSize: "0.6875rem",
  bgcolor: "rgba(0,0,0,0.06)",
  border: "none",
} as const;

interface NoteCardProps {
  note: NoteItemType;
  labelMap?: Record<string, string>;
  onClick: (note: NoteItemType) => void;
  onTogglePin: (id: string) => void;
  onStatusChange: (id: string, status: NoteStatus) => void;
  onDelete: (id: string) => void;
  dragHandle?: ReactNode;
}

export const NoteCard = ({
  note,
  labelMap,
  onClick,
  onTogglePin,
  onStatusChange,
  onDelete,
  dragHandle,
}: NoteCardProps) => {
  const [hovered, setHovered] = useState(false);
  const isTrash = note.status === "TRASHED";
  const isArchived = note.status === "ARCHIVED";

  const title = note.title;
  const content = note.content;
  const color = note.color || "#ffffff";
  const hasChecklist = note.checklistItems?.length > 0;
  const isWhite = color === "#ffffff";

  return (
    <Hb.Card.Root
      sx={{
        backgroundColor: color,
        cursor: "pointer",
        border: "1px solid",
        borderColor: hovered
          ? isWhite
            ? "transparent"
            : "rgba(0,0,0,0.08)"
          : isWhite
            ? "divider"
            : "rgba(0,0,0,0.06)",
        borderRadius: 2,
        position: "relative",
        transition: "box-shadow 0.08s linear, border-color 0.08s linear",
        boxShadow: hovered
          ? "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)"
          : "none",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(note)}
      elevation={0}
    >
      <Hb.Card.Content sx={{ p: "12px 12px 8px", "&:last-child": { pb: 1 } }}>
        {/* 드래그 핸들 — top-left */}
        {dragHandle && (
          <Hb.Box
            sx={{
              position: "absolute",
              top: 2,
              left: 2,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.15s ease",
              pointerEvents: hovered ? "auto" : "none",
              color: "text.secondary",
              zIndex: 1,
            }}
          >
            {dragHandle}
          </Hb.Box>
        )}

        {/* 핀 아이콘 — CSS transition */}
        {!isTrash && (
          <Hb.Button.Icon
            size="small"
            sx={{
              position: "absolute",
              top: 2,
              right: 2,
              opacity: hovered || note.isPinned ? 1 : 0,
              transition: "opacity 0.15s ease",
              pointerEvents: hovered || note.isPinned ? "auto" : "none",
              bgcolor: `${color}cc`,
              "&:hover": { bgcolor: `${color}ee` },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(note.id);
            }}
          >
            {note.isPinned ? (
              <PushPin sx={{ fontSize: 18 }} />
            ) : (
              <PushPinOutlined sx={{ fontSize: 18 }} />
            )}
          </Hb.Button.Icon>
        )}

        {title && (
          <Hb.Text
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              lineHeight: 1.5,
              pr: note.isPinned || hovered ? 3.5 : 0,
              mb: 0.5,
              wordBreak: "break-word",
            }}
          >
            {title}
          </Hb.Text>
        )}

        {!hasChecklist && content && (
          <Hb.Text
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.8125rem",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 10,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {content}
          </Hb.Text>
        )}

        {hasChecklist && (
          <Hb.Box sx={{ mx: -0.5 }}>
            {[...note.checklistItems]
              .sort((a, b) => a.order - b.order)
              .slice(0, 8)
              .map((item, idx) => (
                <Hb.Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 0.125,
                  }}
                >
                  <Hb.Checkbox
                    size="small"
                    checked={item.checked}
                    disabled
                    sx={{
                      p: 0.25,
                      color: "action.disabled",
                      "&.Mui-checked": { color: "action.disabled" },
                    }}
                  />
                  <Hb.Text
                    variant="body2"
                    sx={{
                      fontSize: "0.8125rem",
                      textDecoration: item.checked ? "line-through" : "none",
                      color: item.checked ? "text.disabled" : "text.secondary",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </Hb.Text>
                </Hb.Box>
              ))}
            {note.checklistItems.length > 8 && (
              <Hb.Text
                variant="caption"
                sx={{
                  color: "text.disabled",
                  ml: 3.5,
                  mt: 0.25,
                  display: "block",
                }}
              >
                +{note.checklistItems.length - 8}개 더
              </Hb.Text>
            )}
          </Hb.Box>
        )}

        {(note.reminder ||
          note.labels?.length > 0 ||
          note.members?.length > 0) && (
          <Hb.Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {note.reminder && (
              <Hb.Chip
                icon={<NotificationsActiveOutlined sx={{ fontSize: 14 }} />}
                label={new Date(note.reminder.date).toLocaleDateString("ko-KR")}
                size="small"
                sx={META_CHIP_SX}
              />
            )}
            {note.members?.length > 0 && (
              <Hb.Chip
                icon={<PeopleOutlined sx={{ fontSize: 14 }} />}
                label={note.members.length}
                size="small"
                aria-label={`공유 멤버 ${note.members.length}명`}
                sx={META_CHIP_SX}
              />
            )}
            {note.labels?.map((label) => (
              <Hb.Chip
                key={label}
                label={labelMap?.[label] ?? label}
                size="small"
                sx={META_CHIP_SX}
              />
            ))}
          </Hb.Box>
        )}
      </Hb.Card.Content>

      <Hb.Card.Actions
        sx={{
          pt: 0,
          px: 1,
          pb: 0.75,
          justifyContent: "flex-start",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s ease",
          pointerEvents: hovered ? "auto" : "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {isTrash ? (
          <>
            <Hb.Tooltip title="복원" arrow>
              <Hb.Button.Icon
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() => onStatusChange(note.id, "ACTIVE")}
              >
                <RestoreFromTrashOutlined sx={{ fontSize: 18 }} />
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="영구 삭제" arrow>
              <Hb.Button.Icon
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() => onDelete(note.id)}
              >
                <DeleteOutlined sx={{ fontSize: 18 }} />
              </Hb.Button.Icon>
            </Hb.Tooltip>
          </>
        ) : (
          <>
            <Hb.Tooltip title={isArchived ? "보관 해제" : "보관처리"} arrow>
              <Hb.Button.Icon
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() =>
                  onStatusChange(note.id, isArchived ? "ACTIVE" : "ARCHIVED")
                }
              >
                {isArchived ? (
                  <UnarchiveOutlined sx={{ fontSize: 18 }} />
                ) : (
                  <ArchiveOutlined sx={{ fontSize: 18 }} />
                )}
              </Hb.Button.Icon>
            </Hb.Tooltip>
            <Hb.Tooltip title="삭제" arrow>
              <Hb.Button.Icon
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() => onStatusChange(note.id, "TRASHED")}
              >
                <DeleteOutlined sx={{ fontSize: 18 }} />
              </Hb.Button.Icon>
            </Hb.Tooltip>
          </>
        )}
      </Hb.Card.Actions>
    </Hb.Card.Root>
  );
};
