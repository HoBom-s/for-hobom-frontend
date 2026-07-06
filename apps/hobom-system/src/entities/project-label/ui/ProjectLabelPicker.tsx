import { useState } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import { useQuery } from "hobom-data";
import { Hb } from "@/shared/ui";
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
    <Hb.Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: { sx: { width: 240, borderRadius: 2, boxShadow: 3 } },
      }}
    >
      <Hb.Text
        variant="caption"
        fontWeight={600}
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 4,
          display: "block",
          color: "var(--hb-color-text-secondary)",
        }}
      >
        라벨
      </Hb.Text>
      <Hb.List.Root dense disablePadding sx={{ maxHeight: 240, overflow: "auto" }}>
        {labels.map((label) => (
          <Hb.List.ItemButton key={label.id} onClick={() => onToggle(label.id)} sx={{ py: 0.5 }}>
            <Hb.List.ItemIcon sx={{ minWidth: 32 }}>
              <Hb.Checkbox
                size="small"
                checked={selectedIds.has(label.id)}
                tabIndex={-1}
                disableRipple
              />
            </Hb.List.ItemIcon>
            <Hb.Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: label.color,
                flexShrink: 0,
                mr: 1,
              }}
            />
            <Hb.List.ItemText
              primary={label.name}
              slotProps={{
                primary: {
                  sx: { fontSize: "0.8125rem", color: "text.primary" },
                },
              }}
            />
          </Hb.List.ItemButton>
        ))}
        {labels.length === 0 && (
          <Hb.Text
            variant="body2"
            color="text.disabled"
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 16,
              paddingBottom: 16,
              textAlign: "center",
              fontSize: "0.8125rem",
            }}
          >
            라벨이 없어요
          </Hb.Text>
        )}
      </Hb.List.Root>
      <Hb.Divider />
      {creating ? (
        <Hb.Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
          <Hb.TextField
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
          <Hb.Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {LABEL_COLORS.map((color) => (
              <Hb.Box
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
                  border: color === newColor ? "2px solid" : "2px solid transparent",
                  borderColor: color === newColor ? "text.primary" : "transparent",
                  transition: "border-color 0.1s ease",
                }}
              />
            ))}
          </Hb.Box>
          <Hb.Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
            <Hb.Button.Icon
              size="small"
              aria-label="라벨 생성 취소"
              onClick={() => setCreating(false)}
              sx={{ fontSize: "0.75rem" }}
            >
              취소
            </Hb.Button.Icon>
            <Hb.Button.Icon
              size="small"
              aria-label="새 라벨 추가"
              onClick={handleCreate}
              disabled={!newName.trim() || isPending}
              sx={{ fontSize: "0.75rem", color: "primary.main" }}
            >
              추가
            </Hb.Button.Icon>
          </Hb.Box>
        </Hb.Box>
      ) : (
        <Hb.List.ItemButton onClick={() => setCreating(true)} sx={{ py: 1, gap: 1 }}>
          <AddOutlined sx={{ fontSize: 16, color: "text.secondary" }} />
          <Hb.Text
            variant="body2"
            style={{
              fontSize: "0.8125rem",
              color: "var(--hb-color-text-secondary)",
            }}
          >
            새 라벨 만들기
          </Hb.Text>
        </Hb.List.ItemButton>
      )}
    </Hb.Popover>
  );
};
