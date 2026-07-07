import * as stylex from "@stylexjs/stylex";
import { useVirtualList } from "@/shared/model";
import type { ErrorEventDto } from "@/entities/error-event";
import { Hb } from "@/shared/ui";
import { ERROR_TYPE_CHIP } from "./error-type-chip";

const ROW_HEIGHT = 40;

const styles = stylex.create({
  row: {
    position: "absolute",
    width: "100%",
    height: ROW_HEIGHT,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid",
    borderColor: "var(--hb-color-border)",
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
});

const COLUMNS = [
  { label: "시간", width: 160 },
  { label: "타입", width: 90 },
  { label: "화면", width: 200 },
  { label: "메시지", flex: 1 },
  { label: "사용자", width: 100 },
] as const;

const HEADER_STYLE = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "var(--hb-color-text-secondary)",
  paddingLeft: 12,
  paddingRight: 12,
} as const;

interface ErrorEventTableProps {
  data: ErrorEventDto[];
  onRowClick: (event: ErrorEventDto) => void;
}

export const ErrorEventTable = ({ data, onRowClick }: ErrorEventTableProps) => {
  const { containerProps, virtualItems, totalHeight } = useVirtualList({
    items: data,
    itemHeight: ROW_HEIGHT,
  });

  if (data.length === 0) {
    return (
      <Hb.Text
        variant="body2"
        color="text.secondary"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          textAlign: "center",
        }}
      >
        조건에 맞는 에러가 없습니다
      </Hb.Text>
    );
  }

  return (
    <Hb.Box>
      {/* Header */}
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          height: 36,
          borderBottom: 1,
          borderColor: "var(--hb-color-border)",
        }}
      >
        {COLUMNS.map((col) => (
          <Hb.Box
            key={col.label}
            style={{
              ...HEADER_STYLE,
              width: "width" in col ? col.width : undefined,
              flex: "flex" in col ? col.flex : undefined,
            }}
          >
            {col.label}
          </Hb.Box>
        ))}
      </Hb.Box>
      {/* Virtual Rows */}
      <Hb.Box
        {...containerProps}
        style={{
          ...containerProps.style,
          maxHeight: "calc(100vh - 340px)",
          minHeight: 200,
        }}
      >
        <Hb.Box
          style={{
            height: totalHeight,
            position: "relative",
          }}
        >
          {virtualItems.map(({ item: row, offsetTop }) => {
            const chip = ERROR_TYPE_CHIP[row.errorType];

            return (
              <Hb.Box
                key={row.id}
                onClick={() => onRowClick(row)}
                {...stylex.props(styles.row)}
                style={{ top: offsetTop }}
              >
                <Hb.Box
                  style={{
                    width: 160,
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                >
                  <Hb.Text
                    variant="caption"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      color: "var(--hb-color-text-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.createdAt?.replace("T", " ").slice(0, 19) ?? "-"}
                  </Hb.Text>
                </Hb.Box>
                <Hb.Box
                  style={{
                    width: 90,
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                >
                  <Hb.Chip
                    label={chip.label}
                    size="small"
                    style={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: chip.bg,
                      color: chip.color,
                    }}
                  />
                </Hb.Box>
                <Hb.Box
                  style={{
                    width: 200,
                    paddingLeft: 12,
                    paddingRight: 12,
                    overflow: "hidden",
                  }}
                >
                  <Hb.Tooltip title={row.screen} enterDelay={200}>
                    <Hb.Text
                      variant="body2"
                      noWrap
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                      }}
                    >
                      {row.screen}
                    </Hb.Text>
                  </Hb.Tooltip>
                </Hb.Box>
                <Hb.Box
                  style={{
                    flex: 1,
                    paddingLeft: 12,
                    paddingRight: 12,
                    overflow: "hidden",
                  }}
                >
                  <Hb.Tooltip title={row.message} enterDelay={200}>
                    <Hb.Text
                      variant="body2"
                      noWrap
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {row.message}
                    </Hb.Text>
                  </Hb.Tooltip>
                </Hb.Box>
                <Hb.Box
                  style={{
                    width: 100,
                    paddingLeft: 12,
                    paddingRight: 12,
                  }}
                >
                  <Hb.Text
                    variant="body2"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {row.nickname ?? "-"}
                  </Hb.Text>
                </Hb.Box>
              </Hb.Box>
            );
          })}
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
  );
};
