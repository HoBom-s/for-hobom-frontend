import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Grid, useClientRowModel, useColumnResize } from "@hobom-grid/react";
import type { CellVM } from "@hobom-grid/core";
import type { IssueType } from "@/entities/issue";
import type { WorkflowStatus } from "@/entities/project";
import {
  COLUMNS,
  type ColKey,
  HEADER_ROW_COUNT,
  MIN_COL_WIDTH,
  BORDER_COLOR,
  ROW_EVEN,
  ROW_ODD,
  COL_WIDTH_RATIOS,
} from "./issue-list-constants";
import { HeaderCell } from "./HeaderCell";
import { BodyCell } from "./BodyCell";
import { EmptyState } from "@/shared/ui";

interface IssueGridProps {
  items: IssueType[];
  statuses: WorkflowStatus[];
  filter: (row: IssueType) => boolean;
  sort: { key: keyof IssueType; direction: "asc" | "desc" }[];
  sortKey: ColKey | null;
  sortDir: "asc" | "desc";
  onHeaderClick: (colKey: ColKey) => void;
  onStatusClick: (
    e: React.MouseEvent<HTMLElement>,
    issueId: string,
    currentStatus: string,
  ) => void;
  onRowClick?: (issueId: string) => void;
}

export const IssueGrid = ({
  items,
  statuses,
  filter,
  sort,
  sortKey,
  sortDir,
  onHeaderClick,
  onStatusClick,
  onRowClick,
}: IssueGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rowModel = useClientRowModel(items, {
    getId: (r) => r.id,
    filter,
    sort,
  });

  const initialWidths = useMemo(() => {
    if (containerWidth === 0) return {};
    const widths: Record<number, number> = {};
    COLUMNS.forEach((_, i) => {
      widths[i] = Math.floor(containerWidth * COL_WIDTH_RATIOS[i]);
    });
    return widths;
  }, [containerWidth]);

  const colResize = useColumnResize(initialWidths, MIN_COL_WIDTH);

  const gridHeight = Math.min(40 + rowModel.rowCount * 40, 640);

  const renderCell = useCallback(
    (cell: CellVM) => {
      if (cell.kind === "header") {
        return (
          <HeaderCell
            cell={cell}
            sortKey={sortKey}
            sortDir={sortDir}
            onHeaderClick={onHeaderClick}
            colResize={colResize}
          />
        );
      }

      const bodyIndex = cell.rowIndex - HEADER_ROW_COUNT;
      const row = rowModel.getRow(bodyIndex);
      if (!row) return null;

      const colKey = COLUMNS[cell.colIndex].key;
      const bg = bodyIndex % 2 === 0 ? ROW_EVEN : ROW_ODD;

      return (
        <BodyCell
          colKey={colKey}
          row={row}
          bg={bg}
          statuses={statuses}
          onStatusClick={onStatusClick}
          onRowClick={onRowClick}
        />
      );
    },
    [
      rowModel,
      statuses,
      sortKey,
      sortDir,
      onHeaderClick,
      onStatusClick,
      onRowClick,
      colResize,
    ],
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {containerWidth > 0 && (
        <Grid
          rowCount={rowModel.rowCount}
          colCount={COLUMNS.length}
          defaultRowHeight={40}
          defaultColWidth={Math.floor(containerWidth / COLUMNS.length)}
          colSizes={colResize.colWidths}
          headerRowCount={HEADER_ROW_COUNT}
          renderCell={renderCell}
          style={{ width: "100%", height: gridHeight }}
        />
      )}
      {rowModel.rowCount === 0 && (
        <EmptyState message="조건에 맞는 이슈가 없어요" />
      )}
    </div>
  );
};
