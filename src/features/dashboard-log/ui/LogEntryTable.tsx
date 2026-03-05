import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import type { LogEntry } from "@/entities/log";
import { SERVICE_LABEL_MAP } from "../lib/log-dashboard.lib";
import { METHOD_CHIP_COLOR as METHOD_COLOR } from "./endpoint-error-constants";

const HEADER_SX = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "text.secondary",
} as const;

const LEVEL_COLOR: Record<string, { bg: string; text: string }> = {
  DEBUG: { bg: "#22d3ee18", text: "#22d3ee" },
  INFO: { bg: "#818cf818", text: "#818cf8" },
  WARN: { bg: "#fbbf2418", text: "#fbbf24" },
  ERROR: { bg: "#f8717118", text: "#f87171" },
  FATAL: { bg: "#f472b618", text: "#f472b6" },
};

interface LogEntryTableProps {
  data: LogEntry[];
}

export const LogEntryTable = ({ data }: LogEntryTableProps) => {
  if (data.length === 0) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ py: 4, textAlign: "center" }}
      >
        조건에 맞는 로그가 없습니다
      </Typography>
    );
  }

  return (
    <TableContainer sx={{ maxHeight: 520 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={HEADER_SX}>Level</TableCell>
            <TableCell sx={HEADER_SX}>Service</TableCell>
            <TableCell sx={HEADER_SX}>Method</TableCell>
            <TableCell sx={HEADER_SX}>Path</TableCell>
            <TableCell sx={HEADER_SX}>Message</TableCell>
            <TableCell align="center" sx={HEADER_SX}>
              Status
            </TableCell>
            <TableCell sx={HEADER_SX}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const levelStyle = LEVEL_COLOR[row.level] ?? {
              bg: "#f3f4f6",
              text: "#6b7280",
            };
            return (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Chip
                    label={row.level}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 700,
                      bgcolor: levelStyle.bg,
                      color: levelStyle.text,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontSize: 12 }}>
                    {SERVICE_LABEL_MAP[row.serviceType] ?? row.serviceType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.httpMethod}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: `${METHOD_COLOR[row.httpMethod] ?? "#94a3b8"}18`,
                      color: METHOD_COLOR[row.httpMethod] ?? "#94a3b8",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Tooltip
                    title={`${row.httpMethod} ${row.path}`}
                    enterDelay={200}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                      }}
                    >
                      {row.path}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ maxWidth: 220 }}>
                  <Tooltip title={row.message} enterDelay={200}>
                    <Typography variant="body2" noWrap sx={{ fontSize: 12 }}>
                      {row.message}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.statusCode}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor:
                        row.statusCode >= 500
                          ? "#f8717118"
                          : row.statusCode >= 400
                            ? "#fb923c18"
                            : "#34d39918",
                      color:
                        row.statusCode >= 500
                          ? "#f87171"
                          : row.statusCode >= 400
                            ? "#fb923c"
                            : "#34d399",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{
                      fontVariantNumeric: "tabular-nums",
                      color: "text.secondary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.timestamp?.replace("T", " ").slice(0, 19) ?? "-"}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
