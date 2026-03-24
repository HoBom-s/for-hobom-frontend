import { Hb } from "@/shared/ui";
import type { RequestLogSearchResult } from "@/entities/analytics";

const HEADER_SX = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "text.secondary",
} as const;

const statusChipColor = (code: number) => {
  if (code >= 500) return { bg: "#f8717118", fg: "#f87171" };
  if (code >= 400) return { bg: "#fb923c18", fg: "#fb923c" };

  return { bg: "#34d39918", fg: "#34d399" };
};

const METHOD_COLOR: Record<string, string> = {
  GET: "#60a5fa",
  POST: "#34d399",
  PUT: "#fbbf24",
  PATCH: "#a78bfa",
  DELETE: "#f87171",
};

interface RequestTableProps {
  data: RequestLogSearchResult;
  onTraceClick: (traceId: string) => void;
  onPageChange: (page: number) => void;
}

export const RequestTable = ({ data, onTraceClick, onPageChange }: RequestTableProps) => {
  const totalPages = Math.ceil(data.totalCount / data.pageSize);

  if (data.logs.length === 0) {
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
                Method
              </Hb.Table.Cell>
              <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                Path
              </Hb.Table.Cell>
              <Hb.Table.Cell scope="col" align="center" sx={HEADER_SX}>
                Status
              </Hb.Table.Cell>
              <Hb.Table.Cell scope="col" align="right" sx={HEADER_SX}>
                Duration
              </Hb.Table.Cell>
              <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                Client IP
              </Hb.Table.Cell>
              <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                Time
              </Hb.Table.Cell>
            </Hb.Table.Row>
          </Hb.Table.Head>
          <Hb.Table.Body>
            {data.logs.map((row) => (
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
                <Hb.Table.Cell>
                  <Hb.Chip
                    label={row.method}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: `${METHOD_COLOR[row.method] ?? "#94a3b8"}18`,
                      color: METHOD_COLOR[row.method] ?? "#94a3b8",
                    }}
                  />
                </Hb.Table.Cell>
                <Hb.Table.Cell sx={{ maxWidth: 240 }}>
                  <Hb.Tooltip title={`${row.method} ${row.path}`} enterDelay={200}>
                    <Hb.Text
                      variant="body2"
                      noWrap
                      sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
                    >
                      {row.path}
                    </Hb.Text>
                  </Hb.Tooltip>
                </Hb.Table.Cell>
                <Hb.Table.Cell align="center">
                  <Hb.Chip
                    label={row.statusCode}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: statusChipColor(row.statusCode).bg,
                      color: statusChipColor(row.statusCode).fg,
                    }}
                  />
                </Hb.Table.Cell>
                <Hb.Table.Cell align="right">
                  <Hb.Text
                    variant="body2"
                    sx={{ fontVariantNumeric: "tabular-nums", fontSize: 12 }}
                  >
                    {row.durationMs}ms
                  </Hb.Text>
                </Hb.Table.Cell>
                <Hb.Table.Cell>
                  <Hb.Text variant="body2" sx={{ fontSize: 12 }}>
                    {row.clientIp ?? "-"}
                  </Hb.Text>
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
