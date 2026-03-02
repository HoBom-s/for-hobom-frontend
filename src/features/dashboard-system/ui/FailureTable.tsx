import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

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
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        최근 실패 이벤트
      </Typography>
      {data.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          실패 이벤트가 없습니다
        </Typography>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>이벤트 ID</TableCell>
                <TableCell>타입</TableCell>
                <TableCell>에러</TableCell>
                <TableCell align="center">재시도</TableCell>
                <TableCell>시간</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.eventId}>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {row.eventId.slice(0, 8)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.eventType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {row.lastError ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={row.retryCount}
                      size="small"
                      color={row.retryCount >= 3 ? "error" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {row.failedAt?.slice(0, 19).replace("T", " ") ?? "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
