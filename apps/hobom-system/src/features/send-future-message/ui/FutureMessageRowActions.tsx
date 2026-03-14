import { EditOutlined, DeleteOutlined } from "hobom-design-system/icons";
import { isPendingMessageSendStatus, type FutureMessageType } from "@/entities/future-message";
import { Hb } from "@/shared/ui";

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
        sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
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
        sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
      >
        <DeleteOutlined sx={{ fontSize: 16 }} />
      </Hb.Button.Icon>
    </div>
  );
};
