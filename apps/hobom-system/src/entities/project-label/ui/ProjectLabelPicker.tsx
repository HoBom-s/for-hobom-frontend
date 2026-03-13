import { useState } from "react";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { projectLabelQueries } from "../api/project-label.queries";
import { useCreateProjectLabel } from "../model/useCreateProjectLabel";

const LABEL_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#1d4ed8",
];

interface ProjectLabelPickerProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  projectId: string;
  selectedIds: Set<string>;
  onToggle: (labelId: string) => void;
}

export const ProjectLabelPicker = ({
  anchorEl,
  onClose,
  projectId,
  selectedIds,
  onToggle,
}: ProjectLabelPickerProps) => {
  const { data } = useQuery(projectLabelQueries.listByProject(projectId));
  const labels = data?.items ?? [];
  const { mutate: createLabel, isPending } = useCreateProjectLabel();

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(LABEL_COLORS[5]);

  const handleCreate = () => {
    const trimmed = newName.trim();

    if (!trimmed) return;
    createLabel(
      { projectId, name: trimmed, color: newColor },
      {
        onSuccess: () => {
          setNewName("");
          setCreating(false);
        },
      },
    );
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: { sx: { width: 240, borderRadius: 2, boxShadow: 3 } },
      }}
    >
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{
          px: 2,
          pt: 1.5,
          pb: 0.5,
          display: "block",
          color: "text.secondary",
        }}
      >
        라벨
      </Typography>

      <List dense disablePadding sx={{ maxHeight: 240, overflow: "auto" }}>
        {labels.map((label) => (
          <ListItemButton
            key={label.id}
            onClick={() => onToggle(label.id)}
            sx={{ py: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Checkbox
                size="small"
                checked={selectedIds.has(label.id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: label.color,
                flexShrink: 0,
                mr: 1,
              }}
            />
            <ListItemText
              primary={label.name}
              slotProps={{
                primary: {
                  sx: { fontSize: "0.8125rem", color: "text.primary" },
                },
              }}
            />
          </ListItemButton>
        ))}
        {labels.length === 0 && (
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ px: 2, py: 2, textAlign: "center", fontSize: "0.8125rem" }}
          >
            라벨이 없어요
          </Typography>
        )}
      </List>

      <Divider />

      {creating ? (
        <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            size="small"
            placeholder="라벨 이름"
            aria-label="라벨 이름"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
            }}
            autoFocus
            fullWidth
          />
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {LABEL_COLORS.map((color) => (
              <Box
                key={color}
                role="button"
                tabIndex={0}
                aria-label={`색상 ${color}`}
                aria-pressed={color === newColor}
                onClick={() => setNewColor(color)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setNewColor(color);
                  }
                }}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: color,
                  cursor: "pointer",
                  border:
                    color === newColor ? "2px solid" : "2px solid transparent",
                  borderColor:
                    color === newColor ? "text.primary" : "transparent",
                  transition: "border-color 0.1s ease",
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
            <IconButton
              size="small"
              aria-label="라벨 생성 취소"
              onClick={() => setCreating(false)}
              sx={{ fontSize: "0.75rem" }}
            >
              취소
            </IconButton>
            <IconButton
              size="small"
              aria-label="새 라벨 추가"
              onClick={handleCreate}
              disabled={!newName.trim() || isPending}
              color="primary"
              sx={{ fontSize: "0.75rem" }}
            >
              추가
            </IconButton>
          </Box>
        </Box>
      ) : (
        <ListItemButton
          onClick={() => setCreating(true)}
          sx={{ py: 1, gap: 1 }}
        >
          <AddOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography
            variant="body2"
            sx={{ fontSize: "0.8125rem", color: "text.secondary" }}
          >
            새 라벨 만들기
          </Typography>
        </ListItemButton>
      )}
    </Popover>
  );
};
