import { Hb } from "@/shared/ui";
import type { ErrorListResult } from "@/entities/analytics";

const HEADER_SX = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "text.secondary",
} as const;

interface ErrorTableProps {
  data: ErrorListResult;
  onTraceClick: (traceId: string) => void;
  onPageChange: (page: number) => void;
}

export const ErrorTable = ({ data, onTraceClick, onPageChange }: ErrorTableProps) => {
  const totalPages = Math.ceil(data.totalCount / data.pageSize);

  if (data.errors.length === 0) {
    return (
      <Hb.Text variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        검색 결과가 없어요
      </Hb.Text>
    );
  }

  return (
    <Hb.Box>
      <Hb.Table.Container>
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
            {data.errors.map((row) => (
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
                <Hb.Table.Cell sx={{ maxWidth: 220 }}>
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

      {totalPages > 1 && (
        <Hb.Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Hb.Pagination
            count={totalPages}
            page={data.page}
            onChange={(_, page) => onPageChange(page)}
            size="small"
          />
        </Hb.Box>
      )}
    </Hb.Box>
  );
};
