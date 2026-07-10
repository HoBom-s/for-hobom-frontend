import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Grid, useClientRowModel, useColumnResize, usePagination } from "@hobom-grid/react";
import type { IssueType } from "@/entities/issue";
import type { WorkflowStatus } from "@/entities/project";
import type { ProjectLabelType } from "@/entities/project-label";
import { EmptyState, Hb } from "@/shared/ui";
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
import type { CellVM } from "@hobom-grid/core";

interface IssueGridProps {
  items: IssueType[];
  statuses: WorkflowStatus[];
  labelMap: Map<string, ProjectLabelType>;
  memberMap: Map<string, string>;
  filter: (row: IssueType) => boolean;
  sort: { key: keyof IssueType; direction: "asc" | "desc" }[];
  sortKey: ColKey | null;
  sortDir: "asc" | "desc";
  onHeaderClick: (colKey: ColKey) => void;
  onStatusClick: (e: React.MouseEvent<HTMLElement>, issueId: string, currentStatus: string) => void;
  onRowClick?: (issueId: string) => void;
}

export const IssueGrid = ({
  items,
  statuses,
  labelMap,
  memberMap,
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
      const entry = entries[0];

      if (!entry) return;
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const clientRowModel = useClientRowModel(items, {
    getId: (r) => r.id,
    filter,
    sort,
  });

  const pagination = usePagination(clientRowModel, { initialPageSize: 20 });

  const initialWidths = useMemo(() => {
    if (containerWidth === 0) return {};
    const widths: Record<number, number> = {};

    COLUMNS.forEach((_, i) => {
      widths[i] = Math.floor(containerWidth * (COL_WIDTH_RATIOS[i] ?? 0));
    });

    return widths;
  }, [containerWidth]);

  const colResize = useColumnResize(initialWidths, MIN_COL_WIDTH);

  const { rowModel } = pagination;
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

      const col = COLUMNS[cell.colIndex];

      if (!col) return null;

      const colKey = col.key;
      const bg = bodyIndex % 2 === 0 ? ROW_EVEN : ROW_ODD;

      return (
        <BodyCell
          colKey={colKey}
          row={row}
          bg={bg}
          statuses={statuses}
          labelMap={labelMap}
          memberMap={memberMap}
          onStatusClick={onStatusClick}
          onRowClick={onRowClick}
        />
      );
    },
    [
      rowModel,
      statuses,
      labelMap,
      memberMap,
      sortKey,
      sortDir,
      onHeaderClick,
      onStatusClick,
      onRowClick,
      colResize,
    ],
  );

  return (
    <Hb.Box>
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
        {rowModel.rowCount === 0 && <EmptyState message="조건에 맞는 이슈가 없어요" />}
      </div>
      {pagination.totalPages > 1 && (
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <Hb.Text variant="body2" color="text.secondary">
            총 {pagination.totalRows}건
          </Hb.Text>
          <Hb.Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Hb.Button
              size="small"
              variant="secondary"
              disabled={!pagination.canGoPrev}
              onClick={pagination.goPrev}
            >
              이전
            </Hb.Button>
            <Hb.Text variant="body2">
              {pagination.currentPage + 1} / {pagination.totalPages}
            </Hb.Text>
            <Hb.Button
              size="small"
              variant="secondary"
              disabled={!pagination.canGoNext}
              onClick={pagination.goNext}
            >
              다음
            </Hb.Button>
          </Hb.Box>
        </Hb.Box>
      )}
    </Hb.Box>
  );
};
