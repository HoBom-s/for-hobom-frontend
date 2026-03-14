import { COLUMNS, HEADER_BG, HEADER_TEXT, RESIZE_HANDLE } from "./endpoint-error-constants";
import type { useColumnResize } from "@hobom-grid/react";
import type { CellVM } from "@hobom-grid/core";

interface EndpointErrorHeaderCellProps {
  cell: CellVM;
  colResize: ReturnType<typeof useColumnResize>;
}

export const EndpointErrorHeaderCell = ({ cell, colResize }: EndpointErrorHeaderCellProps) => {
  const col = COLUMNS[cell.colIndex];
  const isRight = col.key === "total" || col.key === "errors";

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: isRight ? "flex-end" : "flex-start",
        padding: "0 12px",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: HEADER_TEXT,
        backgroundColor: HEADER_BG,
        borderBottom: "2px solid #e9ecef",
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      {col.label}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "20%",
          bottom: "20%",
          width: 4,
          cursor: "col-resize",
          borderRadius: 2,
          backgroundColor: "transparent",
          transition: "background-color 0.15s",
        }}
        onPointerEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = RESIZE_HANDLE;
        }}
        onPointerLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          colResize.startResize(cell.colIndex, e);
        }}
      />
    </div>
  );
};
