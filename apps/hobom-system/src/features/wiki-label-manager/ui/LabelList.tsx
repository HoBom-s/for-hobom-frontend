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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
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
              style={{
                paddingLeft: 16,
                paddingRight: 16
              }}
              secondaryAction={
                <Hb.Box
                  style={{
                    display: "flex",
                    gap: 4,
                  }}
                >
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
                    style={{
                      color: "var(--hb-color-danger)",
                    }}
                  >
                    <DeleteOutlined sx={{ fontSize: 16 }} />
                  </Hb.Button.Icon>
                </Hb.Box>
              }
            >
              <Hb.Box
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: label.color,
                  marginRight: 12,
                  flexShrink: 0,
                }}
              />
              <Hb.List.ItemText
                primary={label.name}
                primaryStyle={{ fontSize: "0.875rem", fontWeight: 500 }}
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
