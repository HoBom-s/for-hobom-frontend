import { useState } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import { useCreateLabel, type LabelItemType } from "@/entities/label";
import { Hb } from "@/shared/ui";

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
    createLabel.mutate({ title: trimmed }, { onSuccess: () => setNewTitle("") });
  };

  return (
    <Hb.Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Hb.Box
        style={{
          minWidth: 220,
          maxHeight: 320,
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
          }}
        >
          라벨 선택
        </Hb.Text>

        {labels.length > 0 && (
          <Hb.List.Root dense disablePadding sx={{ maxHeight: 200, overflow: "auto" }}>
            {labels.map((label) => (
              <Hb.List.Item key={label.id} disablePadding>
                <Hb.List.ItemButton onClick={() => onToggle(label.id)} dense sx={{ py: 0.25 }}>
                  <Hb.List.ItemIcon sx={{ minWidth: 32 }}>
                    <Hb.Checkbox
                      size="small"
                      checked={selectedIds.has(label.id)}
                      disableRipple
                      style={{
                        padding: 2,
                      }}
                    />
                  </Hb.List.ItemIcon>
                  <Hb.List.ItemText
                    primary={label.title}
                    slotProps={{
                      primary: {
                        title: label.title,
                        fontSize: "0.8125rem",
                        color: "secondary",
                      },
                    }}
                  />
                </Hb.List.ItemButton>
              </Hb.List.Item>
            ))}
          </Hb.List.Root>
        )}

        <Hb.Box
          style={{
            display: "flex",
            gap: 4,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8,
            paddingBottom: 12,
            borderTop: labels.length > 0 ? "1px solid" : "none",
            borderColor: "var(--hb-color-border)",
          }}
        >
          <Hb.InputBase
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
          <Hb.Button.Icon
            size="small"
            aria-label="라벨 추가"
            onClick={handleCreate}
            disabled={!newTitle.trim() || createLabel.isPending}
          >
            <AddOutlined fontSize="small" />
          </Hb.Button.Icon>
        </Hb.Box>
      </Hb.Box>
    </Hb.Popover>
  );
};
