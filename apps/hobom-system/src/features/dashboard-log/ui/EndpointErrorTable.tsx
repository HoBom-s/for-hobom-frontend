import { useCallback, useMemo } from "react";
import { Grid, useClientRowModel, useColumnResize, useCsvExport } from "@hobom-grid/react";
import { ErrorOutline, CloudDownloadOutlined } from "hobom-design-system/icons";
import { useContainerWidth } from "@/shared/model";
import type { LogEndpointError } from "@/entities/log";
import { Hb } from "@/shared/ui";
import {
  COLUMNS,
  COL_WIDTH_RATIOS,
  HEADER_ROW_COUNT,
  MIN_COL_WIDTH,
  ROW_EVEN,
  ROW_ODD,
  BORDER_COLOR,
} from "./endpoint-error-constants";
import { EndpointErrorHeaderCell } from "./EndpointErrorHeaderCell";
import { EndpointErrorBodyCell } from "./EndpointErrorBodyCell";
import type { CellVM } from "@hobom-grid/core";

interface EndpointErrorTableProps {
  data: LogEndpointError[];
}

export const EndpointErrorTable = ({ data }: EndpointErrorTableProps) => {
  const [containerRef, containerWidth] = useContainerWidth();

  const csvExport = useCsvExport<LogEndpointError>({
    columns: [
      { label: "Method", getValue: (r) => r.httpMethod },
      { label: "Path", getValue: (r) => r.path },
      { label: "Total", getValue: (r) => r.totalCount },
      { label: "Errors", getValue: (r) => r.errorCount },
      {
        label: "Error Rate",
        getValue: (r) => r.errorRate,
        formatValue: (v) => `${(Number(v) * 100).toFixed(1)}%`,
      },
    ],
  });

  const rowModel = useClientRowModel(data, {
    getId: (r) => `${r.httpMethod}-${r.path}`,
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
  const gridHeight = Math.min(40 + rowModel.rowCount * 40, 400);

  const renderCell = useCallback(
    (cell: CellVM) => {
      if (cell.kind === "header") {
        return <EndpointErrorHeaderCell cell={cell} colResize={colResize} />;
      }
      const bodyIndex = cell.rowIndex - HEADER_ROW_COUNT;
      const row = rowModel.getRow(bodyIndex);

      if (!row) return null;
      const bg = bodyIndex % 2 === 0 ? ROW_EVEN : ROW_ODD;

      return <EndpointErrorBodyCell colKey={COLUMNS[cell.colIndex].key} row={row} bg={bg} />;
    },
    [rowModel, colResize],
  );

  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Hb.Text variant="body2" fontWeight={600}>
          Top Error 엔드포인트
        </Hb.Text>
        <Hb.Button.Icon
          size="small"
          onClick={() => csvExport.exportCsv(data, "endpoint-errors.csv")}
          sx={{ ml: 0.5 }}
        >
          <CloudDownloadOutlined sx={{ fontSize: 16 }} />
        </Hb.Button.Icon>
      </Hb.Box>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          flex: 1,
          minHeight: 0,
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
            style={{
              width: "100%",
              height: gridHeight,
              fontSize: 13,
              fontFamily: "inherit",
            }}
          />
        )}
        {rowModel.rowCount === 0 && (
          <Hb.Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 4,
              gap: 1,
            }}
          >
            <ErrorOutline sx={{ fontSize: 40, color: "#dadce0" }} />
            <Hb.Text variant="body2" color="text.disabled">
              에러가 발생한 엔드포인트가 없습니다
            </Hb.Text>
          </Hb.Box>
        )}
      </div>
    </Hb.Box>
  );
};
