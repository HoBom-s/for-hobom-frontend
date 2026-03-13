import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { useVirtualList } from "@/shared/model";
import type { ErrorEventDto } from "@/entities/error-event";
import { ERROR_TYPE_CHIP } from "./error-type-chip";

const ROW_HEIGHT = 40;

const COLUMNS = [
  { label: "시간", width: 160 },
  { label: "타입", width: 90 },
  { label: "화면", width: 200 },
  { label: "메시지", flex: 1 },
  { label: "사용자", width: 100 },
] as const;

const HEADER_SX = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "text.secondary",
  px: 1.5,
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
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ py: 4, textAlign: "center" }}
      >
        조건에 맞는 에러가 없습니다
      </Typography>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 36,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        {COLUMNS.map((col) => (
          <Box
            key={col.label}
            sx={{
              ...HEADER_SX,
              width: "width" in col ? col.width : undefined,
              flex: "flex" in col ? col.flex : undefined,
            }}
          >
            {col.label}
          </Box>
        ))}
      </Box>

      {/* Virtual Rows */}
      <Box
        {...containerProps}
        sx={{
          ...containerProps.style,
          maxHeight: "calc(100vh - 340px)",
          minHeight: 200,
        }}
      >
        <Box sx={{ height: totalHeight, position: "relative" }}>
          {virtualItems.map(({ item: row, offsetTop }) => {
            const chip = ERROR_TYPE_CHIP[row.errorType];

            return (
              <Box
                key={row.id}
                onClick={() => onRowClick(row)}
                sx={{
                  position: "absolute",
                  top: offsetTop,
                  width: "100%",
                  height: ROW_HEIGHT,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  borderBottom: 1,
                  borderColor: "divider",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Box sx={{ width: 160, px: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontVariantNumeric: "tabular-nums",
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.createdAt?.replace("T", " ").slice(0, 19) ?? "-"}
                  </Typography>
                </Box>
                <Box sx={{ width: 90, px: 1.5 }}>
                  <Chip
                    label={chip.label}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 700,
                      bgcolor: chip.bg,
                      color: chip.color,
                    }}
                  />
                </Box>
                <Box sx={{ width: 200, px: 1.5, overflow: "hidden" }}>
                  <Tooltip title={row.screen} enterDelay={200}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                      }}
                    >
                      {row.screen}
                    </Typography>
                  </Tooltip>
                </Box>
                <Box sx={{ flex: 1, px: 1.5, overflow: "hidden" }}>
                  <Tooltip title={row.message} enterDelay={200}>
                    <Typography variant="body2" noWrap sx={{ fontSize: 12 }}>
                      {row.message}
                    </Typography>
                  </Tooltip>
                </Box>
                <Box sx={{ width: 100, px: 1.5 }}>
                  <Typography variant="body2" sx={{ fontSize: 12 }}>
                    {row.nickname ?? "-"}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
