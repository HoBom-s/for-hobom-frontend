import { type ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Box,
  Checkbox,
  Tooltip,
} from "@mui/material";
import {
  PushPin,
  PushPinOutlined,
  ArchiveOutlined,
  UnarchiveOutlined,
  DeleteOutlined,
  RestoreFromTrashOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
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
    <Card
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
      <CardContent sx={{ p: "12px 12px 8px", "&:last-child": { pb: 1 } }}>
        {/* 드래그 핸들 — top-left */}
        {dragHandle && (
          <Box
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
          </Box>
        )}

        {/* 핀 아이콘 — CSS transition */}
        {!isTrash && (
          <IconButton
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
          </IconButton>
        )}

        {title && (
          <Typography
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
          </Typography>
        )}

        {!hasChecklist && content && (
          <Typography
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
          </Typography>
        )}

        {hasChecklist && (
          <Box sx={{ mx: -0.5 }}>
            {[...note.checklistItems]
              .sort((a, b) => a.order - b.order)
              .slice(0, 8)
              .map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 0.125,
                  }}
                >
                  <Checkbox
                    size="small"
                    checked={item.checked}
                    disabled
                    sx={{
                      p: 0.25,
                      color: "action.disabled",
                      "&.Mui-checked": { color: "action.disabled" },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8125rem",
                      textDecoration: item.checked ? "line-through" : "none",
                      color: item.checked ? "text.disabled" : "text.secondary",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            {note.checklistItems.length > 8 && (
              <Typography
                variant="caption"
                sx={{
                  color: "text.disabled",
                  ml: 3.5,
                  mt: 0.25,
                  display: "block",
                }}
              >
                +{note.checklistItems.length - 8}개 더
              </Typography>
            )}
          </Box>
        )}

        {(note.reminder || note.labels?.length > 0) && (
          <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {note.reminder && (
              <Chip
                icon={<NotificationsActiveOutlined sx={{ fontSize: 14 }} />}
                label={new Date(note.reminder.date).toLocaleDateString("ko-KR")}
                size="small"
                sx={META_CHIP_SX}
              />
            )}
            {note.labels?.map((label) => (
              <Chip
                key={label}
                label={labelMap?.[label] ?? label}
                size="small"
                sx={META_CHIP_SX}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions
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
            <Tooltip title="복원" arrow>
              <IconButton
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() => onStatusChange(note.id, "ACTIVE")}
              >
                <RestoreFromTrashOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="영구 삭제" arrow>
              <IconButton
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() => onDelete(note.id)}
              >
                <DeleteOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title={isArchived ? "보관 해제" : "보관처리"} arrow>
              <IconButton
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
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제" arrow>
              <IconButton
                size="small"
                sx={{ color: "text.secondary" }}
                onClick={() => onStatusChange(note.id, "TRASHED")}
              >
                <DeleteOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Card>
  );
};
