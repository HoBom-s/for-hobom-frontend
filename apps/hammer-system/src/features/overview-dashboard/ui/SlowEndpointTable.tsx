import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import type { SlowEndpointEntry } from "@/entities/analytics";

const HEADER_SX = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "text.secondary",
} as const;

const METHOD_COLOR: Record<string, string> = {
  GET: "#60a5fa",
  POST: "#34d399",
  PUT: "#fbbf24",
  PATCH: "#a78bfa",
  DELETE: "#f87171",
};

interface SlowEndpointTableProps {
  data: SlowEndpointEntry[];
}

export const SlowEndpointTable = ({ data }: SlowEndpointTableProps) => {
  return (
    <DashboardPaper>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
        Slow Endpoints
      </Hb.Text>
      {data.length === 0 ? (
        <Hb.Text variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          데이터가 없어요
        </Hb.Text>
      ) : (
        <Hb.Table.Container sx={{ maxHeight: 360 }}>
          <Hb.Table.Root size="small" stickyHeader>
            <Hb.Table.Head>
              <Hb.Table.Row>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Method
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" sx={HEADER_SX}>
                  Path
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" align="right" sx={HEADER_SX}>
                  Avg (ms)
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" align="right" sx={HEADER_SX}>
                  Max (ms)
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col" align="right" sx={HEADER_SX}>
                  Count
                </Hb.Table.Cell>
              </Hb.Table.Row>
            </Hb.Table.Head>
            <Hb.Table.Body>
              {data.map((row) => (
                <Hb.Table.Row key={`${row.method}-${row.path}`} hover>
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
                    <Hb.Text
                      variant="body2"
                      noWrap
                      sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
                    >
                      {row.path}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="right">
                    <Hb.Text variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                      {Math.round(row.avgMs)}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="right">
                    <Hb.Text
                      variant="body2"
                      sx={{
                        fontVariantNumeric: "tabular-nums",
                        color: row.maxMs > 1000 ? "error.main" : "text.primary",
                        fontWeight: row.maxMs > 1000 ? 600 : 400,
                      }}
                    >
                      {Math.round(row.maxMs)}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="right">
                    <Hb.Text variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                      {row.requestCount.toLocaleString()}
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
