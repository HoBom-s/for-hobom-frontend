import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import type { ErrorDetail } from "@/entities/analytics";

const HEADER_SX = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "text.secondary",
} as const;

interface RecentErrorTableProps {
  data: ErrorDetail[];
  onTraceClick: (traceId: string) => void;
}

export const RecentErrorTable = ({ data, onTraceClick }: RecentErrorTableProps) => {
  return (
    <DashboardPaper>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
        Recent Errors
      </Hb.Text>
      {data.length === 0 ? (
        <Hb.Text variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          에러가 없어요
        </Hb.Text>
      ) : (
        <Hb.Table.Container sx={{ maxHeight: 360 }}>
          <Hb.Table.Root size="small" stickyHeader>
            <Hb.Table.Head>
              <Hb.Table.Row>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Trace ID
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Exception
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Source
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" align="center" sx={HEADER_SX}>
                  Level
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Message
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Time
                </Hb.Table.Cell>
              </Hb.Table.Row>
            </Hb.Table.Head>
            <Hb.Table.Body>
              {data.map((row) => (
                <Hb.Table.Row key={row.id} hover>
                  <Hb.Table.Cell>
                    <Hb.Text
                      variant="caption"
                      onClick={() => onTraceClick(row.traceId)}
                      sx={{
                        fontFamily: "monospace",
                        color: "primary.main",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {row.traceId.slice(0, 8)}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell sx={{ maxWidth: 160 }}>
                    <Hb.Tooltip title={row.exceptionType} enterDelay={200}>
                      <Hb.Text
                        variant="body2"
                        noWrap
                        sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
                      >
                        {row.exceptionType}
                      </Hb.Text>
                    </Hb.Tooltip>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text variant="body2" sx={{ fontSize: 12 }}>
                      {row.source}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="center">
                    <Hb.Chip
                      label={row.level}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: 11,
                        fontWeight: 600,
                        bgcolor: row.level === "ERROR" ? "#f8717118" : "#fb923c18",
                        color: row.level === "ERROR" ? "#f87171" : "#fb923c",
                      }}
                    />
                  </Hb.Table.Cell>
                  <Hb.Table.Cell sx={{ maxWidth: 180 }}>
                    <Hb.Tooltip title={row.message} enterDelay={200}>
                      <Hb.Text variant="body2" noWrap sx={{ fontSize: 12 }}>
                        {row.message}
                      </Hb.Text>
                    </Hb.Tooltip>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text
                      variant="caption"
                      sx={{
                        fontVariantNumeric: "tabular-nums",
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.timestamp.replace("T", " ").slice(0, 19)}
                    </Hb.Text>
                  </Hb.Table.Cell>
                </Hb.Table.Row>
              ))}
            </Hb.Table.Body>
          </Hb.Table.Root>
        </Hb.Table.Container>
      )}
    </DashboardPaper>
  );
};
