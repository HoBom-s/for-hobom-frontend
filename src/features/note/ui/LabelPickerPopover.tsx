import { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useCreateLabel, type LabelItemType } from "@/entities/label";

interface LabelPickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  labels: LabelItemType[];
  selectedIds: Set<string>;
  onToggle: (labelId: string) => void;
}

export const LabelPickerPopover = ({
  anchorEl,
  onClose,
  labels,
  selectedIds,
  onToggle,
}: LabelPickerPopoverProps) => {
  const [newTitle, setNewTitle] = useState("");
  const createLabel = useCreateLabel();

  const handleCreate = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    createLabel.mutate(
      { title: trimmed },
      { onSuccess: () => setNewTitle("") },
    );
  };

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ minWidth: 220, maxHeight: 320 }}>
        <Typography
          variant="caption"
          fontWeight={600}
          sx={{ px: 2, pt: 1.5, pb: 0.5, display: "block" }}
        >
          라벨 선택
        </Typography>

        {labels.length > 0 && (
          <List dense disablePadding sx={{ maxHeight: 200, overflow: "auto" }}>
            {labels.map((label) => (
              <ListItem key={label.id} disablePadding>
                <ListItemButton
                  onClick={() => onToggle(label.id)}
                  dense
                  sx={{ py: 0.25 }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Checkbox
                      size="small"
                      checked={selectedIds.has(label.id)}
                      disableRipple
                      sx={{ p: 0.25 }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={label.title}
                    slotProps={{
                      primary: {
                        title: label.title,
                        fontSize: "0.8125rem",
                        color: "secondary",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            px: 1.5,
            pt: 1,
            pb: 1.5,
            borderTop: labels.length > 0 ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
          <InputBase
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="새 라벨 만들기..."
            size="small"
            sx={{
              flex: 1,
              fontSize: "0.8125rem",
              px: 1,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCreate();
              }
            }}
          />
          <IconButton
            size="small"
            onClick={handleCreate}
            disabled={!newTitle.trim() || createLabel.isPending}
          >
            <AddOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Popover>
  );
};
