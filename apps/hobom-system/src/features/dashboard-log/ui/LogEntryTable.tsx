import type { LogEntry } from "@/entities/log";
import { Hb } from "@/shared/ui";
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

const statusChipStyle = (statusCode: number): { bg: string; text: string } => {
  if (statusCode >= 500) {
    return { bg: "#f8717118", text: "#f87171" };
  }
  if (statusCode >= 400) {
    return { bg: "#fb923c18", text: "#fb923c" };
  }

  return { bg: "#34d39918", text: "#34d399" };
};

interface LogEntryTableProps {
  data: LogEntry[];
}

export const LogEntryTable = ({ data }: LogEntryTableProps) => {
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
        조건에 맞는 로그가 없습니다
      </Hb.Text>
    );
  }

  return (
    <Hb.Table.Container sx={{ maxHeight: 520 }}>
      <Hb.Table.Root size="small" stickyHeader>
        <Hb.Table.Head>
          <Hb.Table.Row>
            <Hb.Table.Cell scope="col" sx={HEADER_SX}>
              Level
            </Hb.Table.Cell>
            <Hb.Table.Cell scope="col" sx={HEADER_SX}>
              Service
            </Hb.Table.Cell>
            <Hb.Table.Cell scope="col" sx={HEADER_SX}>
              Method
            </Hb.Table.Cell>
            <Hb.Table.Cell scope="col" sx={HEADER_SX}>
              Path
            </Hb.Table.Cell>
            <Hb.Table.Cell scope="col" sx={HEADER_SX}>
              Message
            </Hb.Table.Cell>
            <Hb.Table.Cell scope="col" align="center" sx={HEADER_SX}>
              Status
            </Hb.Table.Cell>
            <Hb.Table.Cell scope="col" sx={HEADER_SX}>
              Time
            </Hb.Table.Cell>
          </Hb.Table.Row>
        </Hb.Table.Head>
        <Hb.Table.Body>
          {data.map((row) => {
            const levelStyle = LEVEL_COLOR[row.level] ?? {
              bg: "#f3f4f6",
              text: "#6b7280",
            };
            const statusStyle = statusChipStyle(row.statusCode);

            return (
              <Hb.Table.Row key={row.id} hover>
                <Hb.Table.Cell>
                  <Hb.Chip
                    label={row.level}
                    size="small"
                    style={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 700,
                      backgroundColor: levelStyle.bg,
                      color: levelStyle.text,
                    }}
                  />
                </Hb.Table.Cell>
                <Hb.Table.Cell>
                  <Hb.Text
                    variant="body2"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {SERVICE_LABEL_MAP[row.serviceType] ?? row.serviceType}
                  </Hb.Text>
                </Hb.Table.Cell>
                <Hb.Table.Cell>
                  <Hb.Chip
                    label={row.httpMethod}
                    size="small"
                    style={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      backgroundColor: `${METHOD_COLOR[row.httpMethod] ?? "#94a3b8"}18`,
                      color: METHOD_COLOR[row.httpMethod] ?? "#94a3b8",
                    }}
                  />
                </Hb.Table.Cell>
                <Hb.Table.Cell sx={{ maxWidth: 200 }}>
                  <Hb.Tooltip title={`${row.httpMethod} ${row.path}`} enterDelay={200}>
                    <Hb.Text
                      variant="body2"
                      noWrap
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                      }}
                    >
                      {row.path}
                    </Hb.Text>
                  </Hb.Tooltip>
                </Hb.Table.Cell>
                <Hb.Table.Cell sx={{ maxWidth: 220 }}>
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
                </Hb.Table.Cell>
                <Hb.Table.Cell align="center">
                  <Hb.Chip
                    label={row.statusCode}
                    size="small"
                    style={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,

                      backgroundColor: statusStyle.bg,

                      color: statusStyle.text,
                    }}
                  />
                </Hb.Table.Cell>
                <Hb.Table.Cell>
                  <Hb.Text
                    variant="caption"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                      color: "var(--hb-color-text-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.timestamp?.replace("T", " ").slice(0, 19) ?? "-"}
                  </Hb.Text>
                </Hb.Table.Cell>
              </Hb.Table.Row>
            );
          })}
        </Hb.Table.Body>
      </Hb.Table.Root>
    </Hb.Table.Container>
  );
};
