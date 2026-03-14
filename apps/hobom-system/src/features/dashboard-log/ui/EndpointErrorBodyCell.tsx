import type { LogEndpointError } from "@/entities/log";
import { Hb } from "@/shared/ui";
import {
  type ColKey,
  BORDER_COLOR,
  METHOD_CHIP_COLOR,
  getErrorRateColor,
} from "./endpoint-error-constants";

interface EndpointErrorBodyCellProps {
  colKey: ColKey;
  row: LogEndpointError;
  bg: string;
}

export const EndpointErrorBodyCell = ({ colKey, row, bg }: EndpointErrorBodyCellProps) => {
  const base: React.CSSProperties = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    backgroundColor: bg,
    borderBottom: `1px solid ${BORDER_COLOR}`,
    boxSizing: "border-box",
    overflow: "hidden",
  };

  switch (colKey) {
    case "method": {
      const color = METHOD_CHIP_COLOR[row.httpMethod] ?? "#9ca3af";

      return (
        <div style={base}>
          <Hb.Chip
            label={row.httpMethod}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.02em",
              bgcolor: `${color}14`,
              color,
              border: `1px solid ${color}40`,
            }}
          />
        </div>
      );
    }
    case "path":
      return (
        <Hb.Tooltip
          title={row.path}
          placement="bottom-start"
          enterDelay={100}
          slotProps={{
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
            tooltip: {
              sx: {
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 12,
                maxWidth: 480,
                wordBreak: "break-all",
              },
            },
          }}
        >
          <div style={base}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: 12,
                color: "#374151",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {row.path}
            </span>
          </div>
        </Hb.Tooltip>
      );
    case "total":
      return (
        <div style={{ ...base, justifyContent: "flex-end" }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.totalCount.toLocaleString()}
          </span>
        </div>
      );
    case "errors":
      return (
        <div style={{ ...base, justifyContent: "flex-end" }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color: row.errorCount > 0 ? "#dc2626" : "#9ca3af",
            }}
          >
            {row.errorCount.toLocaleString()}
          </span>
        </div>
      );
    case "rate": {
      const pct = Math.min(row.errorRate * 100, 100);
      const barColor = getErrorRateColor(row.errorRate);

      return (
        <div style={{ ...base, gap: 8 }}>
          <div
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              backgroundColor: "#f3f4f6",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: "100%",
                borderRadius: 3,
                backgroundColor: barColor,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color: barColor,
              minWidth: 42,
              textAlign: "right",
            }}
          >
            {pct.toFixed(1)}%
          </span>
        </div>
      );
    }
    default: {
      const _exhaustive: never = colKey;

      return _exhaustive;
    }
  }
};
