import { useState } from "react";
import { Grid, useClientRowModel, useColumnResize } from "@hobom-grid/react";
import { MailOutline } from "hobom-design-system/icons";
import { useDeleteFutureMessage, type FutureMessageType } from "@/entities/future-message";
import { useContainerWidth } from "@/shared/model";
import { Hb } from "@/shared/ui";
import {
  HEADER_ROW_COUNT,
  MIN_COL_WIDTH,
  ROW_NUM_WIDTH,
  ACTIONS_WIDTH,
  COLUMNS,
} from "../config/future-message-grid.config";
import { GridHeaderCell } from "./GridHeaderCell";
import { GridBodyCell } from "./GridBodyCell";
import { FutureMessageEditDialog } from "./FutureMessageEditDialog";

export const FutureMessageGrid = ({ messages }: { messages: FutureMessageType[] }) => {
  const [containerRef, containerWidth] = useContainerWidth();
  const [editingMessage, setEditingMessage] = useState<FutureMessageType | null>(null);
  const { mutate: mutateDelete } = useDeleteFutureMessage();

  if (messages.length === 0) {
    return (
      <Hb.Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 80,
          paddingBottom: 80,
          gap: 12,
        }}
      >
        <MailOutline sx={{ fontSize: 64, color: "#dadce0" }} />
        <Hb.Text
          variant="body1"
          style={{
            color: "var(--hb-color-text-disabled)",
            fontSize: "0.95rem",
          }}
        >
          메시지가 없어요
        </Hb.Text>
      </Hb.Box>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {containerWidth > 0 && (
        <GridInner
          messages={messages}
          containerWidth={containerWidth}
          onEdit={setEditingMessage}
          onDelete={(id) => mutateDelete({ id })}
        />
      )}
      {editingMessage && (
        <FutureMessageEditDialog
          message={editingMessage}
          open={true}
          onClose={() => setEditingMessage(null)}
        />
      )}
    </div>
  );
};

const GridInner = ({
  messages,
  containerWidth,
  onEdit,
  onDelete,
}: {
  messages: FutureMessageType[];
  containerWidth: number;
  onEdit: (message: FutureMessageType) => void;
  onDelete: (id: string) => void;
}) => {
  const rowModel = useClientRowModel(messages, { getId: (r) => r.id });

  const remaining = containerWidth - ROW_NUM_WIDTH - ACTIONS_WIDTH;
  const initialWidths: Record<number, number> = {
    0: ROW_NUM_WIDTH,
    1: Math.floor(remaining * 0.45),
    2: Math.floor(remaining * 0.3),
    3: Math.floor(remaining * 0.25),
    4: ACTIONS_WIDTH,
  };

  const colResize = useColumnResize(initialWidths, MIN_COL_WIDTH);

  return (
    <Grid
      rowCount={rowModel.rowCount}
      colCount={COLUMNS.length}
      defaultRowHeight={60}
      defaultColWidth={Math.floor(containerWidth / COLUMNS.length)}
      colSizes={colResize.colWidths}
      headerRowCount={HEADER_ROW_COUNT}
      renderCell={(cell) => {
        if (cell.kind === "header") {
          return <GridHeaderCell colIndex={cell.colIndex} onStartResize={colResize.startResize} />;
        }

        const bodyIndex = cell.rowIndex - HEADER_ROW_COUNT;
        const row = rowModel.getRow(bodyIndex);
        const col = COLUMNS[cell.colIndex];

        if (!row || !col) return null;

        return (
          <GridBodyCell
            colKey={col.key}
            row={row}
            bodyIndex={bodyIndex}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
