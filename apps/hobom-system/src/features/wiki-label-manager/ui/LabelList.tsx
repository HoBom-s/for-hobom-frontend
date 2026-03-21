import { EditOutlined, DeleteOutlined, AddOutlined } from "hobom-design-system/icons";
import { Hb, EmptyState } from "@/shared/ui";
import { useLabelManager } from "../model/useLabelManager";
import { CreateLabelDialog } from "./CreateLabelDialog";

interface LabelListProps {
  spaceKey: string;
}

export const LabelList = ({ spaceKey }: LabelListProps) => {
  const {
    labels,
    createDialogOpen,
    setCreateDialogOpen,
    editingLabel,
    setEditingLabel,
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
  } = useLabelManager({ spaceKey });

  return (
    <Hb.Box>
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
        }}
      >
        <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
          라벨 ({labels.length})
        </Hb.Text>
        <Hb.Button.Icon
          size="small"
          aria-label="라벨 추가"
          onClick={() => setCreateDialogOpen(true)}
        >
          <AddOutlined fontSize="small" />
        </Hb.Button.Icon>
      </Hb.Box>

      {!labels.length ? (
        <EmptyState message="라벨이 없어요." />
      ) : (
        <Hb.List.Root dense disablePadding>
          {labels.map((label) => (
            <Hb.List.Item
              key={label.id}
              sx={{ px: 2 }}
              secondaryAction={
                <Hb.Box sx={{ display: "flex", gap: 0.5 }}>
                  <Hb.Button.Icon
                    size="small"
                    aria-label={`${label.name} 수정`}
                    onClick={() => setEditingLabel(label)}
                    disabled={isDeleting}
                  >
                    <EditOutlined sx={{ fontSize: 16 }} />
                  </Hb.Button.Icon>
                  <Hb.Button.Icon
                    size="small"
                    aria-label={`${label.name} 삭제`}
                    onClick={() => handleDelete(label.id)}
                    disabled={isDeleting}
                    sx={{ color: "error.main" }}
                  >
                    <DeleteOutlined sx={{ fontSize: 16 }} />
                  </Hb.Button.Icon>
                </Hb.Box>
              }
            >
              <Hb.Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: label.color,
                  mr: 1.5,
                  flexShrink: 0,
                }}
              />
              <Hb.List.ItemText
                primary={label.name}
                slotProps={{
                  primary: { sx: { fontSize: "0.875rem", fontWeight: 500 } },
                }}
              />
            </Hb.List.Item>
          ))}
        </Hb.List.Root>
      )}

      <CreateLabelDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={handleCreate}
        loading={isCreating}
      />

      <CreateLabelDialog
        open={editingLabel !== null}
        onClose={() => setEditingLabel(null)}
        onSubmit={(name, color) => {
          if (editingLabel) handleUpdate(editingLabel.id, name, color);
        }}
        loading={isUpdating}
        initialName={editingLabel?.name}
        initialColor={editingLabel?.color}
        title="라벨 수정"
      />
    </Hb.Box>
  );
};
