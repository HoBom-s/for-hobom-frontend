import * as stylex from "@stylexjs/stylex";
import { EditOutlined, DeleteOutlined } from "hobom-design-system/icons";
import { isPendingMessageSendStatus, type FutureMessageType } from "@/entities/future-message";
import { Hb } from "@/shared/ui";

const styles = stylex.create({
  editIcon: {
    color: "var(--hb-color-text-secondary)",
    ":hover": { color: "var(--hb-color-accent)" },
  },
  deleteIcon: {
    color: "var(--hb-color-text-secondary)",
    ":hover": { color: "var(--hb-color-danger)" },
  },
});

interface Props {
  row: FutureMessageType;
  onEdit: (message: FutureMessageType) => void;
  onDelete: (id: string) => void;
}

export const FutureMessageRowActions = ({ row, onEdit, onDelete }: Props) => {
  if (!isPendingMessageSendStatus(row.sendStatus)) return null;

  return (
    <div style={{ display: "flex", gap: 2 }} onPointerDown={(e) => e.stopPropagation()}>
      <Hb.Button.Icon
        size="small"
        aria-label="편집"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          onEdit(row);
        }}
        {...stylex.props(styles.editIcon)}
      >
        <EditOutlined sx={{ fontSize: 16 }} />
      </Hb.Button.Icon>
      <Hb.Button.Icon
        size="small"
        aria-label="삭제"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          onDelete(row.id);
        }}
        {...stylex.props(styles.deleteIcon)}
      >
        <DeleteOutlined sx={{ fontSize: 16 }} />
      </Hb.Button.Icon>
    </div>
  );
};
