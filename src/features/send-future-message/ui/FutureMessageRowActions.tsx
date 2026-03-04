import { IconButton } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import {
  isPendingMessageSendStatus,
  type FutureMessageType,
} from "@/entities/future-message";

interface Props {
  row: FutureMessageType;
  onEdit: (message: FutureMessageType) => void;
  onDelete: (id: string) => void;
}

export const FutureMessageRowActions = ({ row, onEdit, onDelete }: Props) => {
  if (!isPendingMessageSendStatus(row.sendStatus)) return null;

  return (
    <div
      style={{ display: "flex", gap: 2 }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <IconButton
        size="small"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          onEdit(row);
        }}
        sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
      >
        <EditOutlined sx={{ fontSize: 16 }} />
      </IconButton>
      <IconButton
        size="small"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          onDelete(row.id);
        }}
        sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
      >
        <DeleteOutlined sx={{ fontSize: 16 }} />
      </IconButton>
    </div>
  );
};
