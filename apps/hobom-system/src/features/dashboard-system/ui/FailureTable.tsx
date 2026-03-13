import { Hb } from "@/shared/ui";

interface FailureEvent {
  eventId: string;
  eventType: string;
  lastError: string | null;
  retryCount: number;
  failedAt: string | null;
}

interface FailureTableProps {
  data: FailureEvent[];
}

export const FailureTable = ({ data }: FailureTableProps) => {
  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        최근 실패 이벤트
      </Hb.Text>
      {data.length === 0 ? (
        <Hb.Text
          variant="body2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          실패 이벤트가 없습니다
        </Hb.Text>
      ) : (
        <Hb.Table.Container>
          <Hb.Table.Root size="small">
            <Hb.Table.Head>
              <Hb.Table.Row>
                <Hb.Table.Cell scope="col">이벤트 ID</Hb.Table.Cell>
                <Hb.Table.Cell scope="col">타입</Hb.Table.Cell>
                <Hb.Table.Cell scope="col">에러</Hb.Table.Cell>
                <Hb.Table.Cell scope="col" align="center">
                  재시도
                </Hb.Table.Cell>
                <Hb.Table.Cell scope="col">시간</Hb.Table.Cell>
              </Hb.Table.Row>
            </Hb.Table.Head>
            <Hb.Table.Body>
              {data.map((row) => (
                <Hb.Table.Row key={row.eventId}>
                  <Hb.Table.Cell>
                    <Hb.Text variant="caption" sx={{ fontFamily: "monospace" }}>
                      {row.eventId.slice(0, 8)}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text variant="body2">{row.eventType}</Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {row.lastError ?? "-"}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="center">
                    <Hb.Chip
                      label={row.retryCount}
                      size="small"
                      color={row.retryCount >= 3 ? "error" : "default"}
                    />
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text variant="caption">
                      {row.failedAt?.slice(0, 19).replace("T", " ") ?? "-"}
                    </Hb.Text>
                  </Hb.Table.Cell>
                </Hb.Table.Row>
              ))}
            </Hb.Table.Body>
          </Hb.Table.Root>
        </Hb.Table.Container>
      )}
    </Hb.Box>
  );
};
