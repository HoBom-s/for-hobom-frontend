import { UnfoldMore, ArrowUpward, ArrowDownward } from "hobom-design-system/icons";
import { COLUMNS, type ColKey, HEADER_BG, HEADER_TEXT } from "./issue-list-constants";
import type { useColumnResize } from "@hobom-grid/react";
import type { CellVM } from "@hobom-grid/core";

const ALIGN_JUSTIFY: Record<string, string | undefined> = {
  right: "flex-end",
  center: "center",
};

interface HeaderCellProps {
  cell: CellVM;
  sortKey: ColKey | null;
  sortDir: "asc" | "desc";
  onHeaderClick: (colKey: ColKey) => void;
  colResize: ReturnType<typeof useColumnResize>;
}

export const HeaderCell = ({
  cell,
  sortKey,
  sortDir,
  onHeaderClick,
  colResize,
}: HeaderCellProps) => {
  const col = COLUMNS[cell.colIndex];
  const isSorted = sortKey === col.key;

  const renderSortIcon = () => {
    if (!isSorted) {
      return <UnfoldMore sx={{ fontSize: 14 }} />;
    }

    return sortDir === "asc" ? (
      <ArrowUpward sx={{ fontSize: 14 }} />
    ) : (
      <ArrowDownward sx={{ fontSize: 14 }} />
    );
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        fontWeight: 600,
        fontSize: 12,
        color: HEADER_TEXT,
        backgroundColor: HEADER_BG,
        borderBottom: `2px solid var(--mui-palette-divider)`,
        boxSizing: "border-box",
        userSelect: "none",
        cursor: col.sortable ? "pointer" : "default",
        justifyContent: ALIGN_JUSTIFY[col.align],
        gap: 4,
      }}
      onPointerDown={(e) => {
        if (col.sortable) {
          e.stopPropagation();
          onHeaderClick(col.key);
        }
      }}
    >
      <span>{col.label}</span>
      {col.sortable && (
        <span style={{ display: "inline-flex", opacity: isSorted ? 1 : 0.3 }}>
          {renderSortIcon()}
        </span>
      )}
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
          (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--hb-color-accent)";
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
