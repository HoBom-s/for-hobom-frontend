import { Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import { Hb, SuspenseLoader, ErrorBoundary } from "@/shared/ui";
import { analyticsQueries } from "@/entities/analytics";
import type { RequestLogDetail, ErrorDetail } from "@/entities/analytics";

interface TraceDetailDialogProps {
  traceId: string | null;
  onClose: () => void;
}

const RequestLogItem = ({ log }: { log: RequestLogDetail }) => (
  <Hb.Box
    sx={{
      display: "flex",
      gap: 2,
      pb: 1.5,
      borderLeft: "2px solid",
      borderColor: "divider",
      ml: 1,
      pl: 2,
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: -5,
        top: 6,
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "success.main",
      },
    }}
  >
    <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <Hb.Chip
          label={log.method}
          size="small"
          sx={{ height: 20, fontSize: 10, fontWeight: 600 }}
        />
        <Hb.Text
          variant="body2"
          noWrap
          sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}
        >
          {log.path}
        </Hb.Text>
      </Hb.Box>
      <Hb.Box sx={{ display: "flex", gap: 1.5 }}>
        <Hb.Text variant="caption" color="text.secondary">
          {log.durationMs}ms
        </Hb.Text>
        <Hb.Chip
          label={log.statusCode}
          size="small"
          sx={{
            height: 18,
            fontSize: 10,
            fontWeight: 600,
            bgcolor: log.statusCode >= 400 ? "#f8717118" : "#34d39918",
            color: log.statusCode >= 400 ? "#f87171" : "#34d399",
          }}
        />
        <Hb.Text variant="caption" color="text.secondary">
          {log.timestamp.replace("T", " ").slice(0, 19)}
        </Hb.Text>
      </Hb.Box>
    </Hb.Box>
  </Hb.Box>
);

const ErrorLogItem = ({ log }: { log: ErrorDetail }) => (
  <Hb.Box
    sx={{
      display: "flex",
      gap: 2,
      pb: 1.5,
      borderLeft: "2px solid",
      borderColor: "divider",
      ml: 1,
      pl: 2,
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        left: -5,
        top: 6,
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "error.main",
      },
    }}
  >
    <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <Hb.Text variant="body2" fontWeight={600} color="error.main">
          {log.exceptionType}
        </Hb.Text>
        <Hb.Chip
          label={log.level}
          size="small"
          sx={{
            height: 18,
            fontSize: 10,
            fontWeight: 600,
            bgcolor: "#f8717118",
            color: "#f87171",
          }}
        />
      </Hb.Box>
      <Hb.Text variant="body2" sx={{ fontSize: 12, mb: 0.5 }}>
        {log.message}
      </Hb.Text>
      <Hb.Text variant="caption" color="text.secondary">
        {log.source} &middot; {log.timestamp.replace("T", " ").slice(0, 19)}
      </Hb.Text>
    </Hb.Box>
  </Hb.Box>
);

const TraceContent = ({ traceId }: { traceId: string }) => {
  const { data } = useSuspenseQuery(analyticsQueries.trace(traceId));

  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Hb.Text variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
        Trace: {traceId}
      </Hb.Text>
      <Hb.Divider sx={{ my: 1 }} />

      {data.requestLogs.length > 0 && (
        <>
          <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
            Request Logs
          </Hb.Text>
          {data.requestLogs.map((log) => (
            <RequestLogItem key={log.id} log={log} />
          ))}
        </>
      )}

      {data.errorLogs.length > 0 && (
        <>
          <Hb.Text variant="body2" fontWeight={600} sx={{ mt: 1, mb: 0.5 }}>
            Error Logs
          </Hb.Text>
          {data.errorLogs.map((log) => (
            <ErrorLogItem key={log.id} log={log} />
          ))}
        </>
      )}

      {data.requestLogs.length === 0 && data.errorLogs.length === 0 && (
        <Hb.Text variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
          로그가 없어요
        </Hb.Text>
      )}
    </Hb.Box>
  );
};

export const TraceDetailDialog = ({ traceId, onClose }: TraceDetailDialogProps) => {
  return (
    <Hb.Dialog.Root open={traceId !== null} onClose={onClose} size="sm">
      <Hb.Dialog.Title>Trace Detail</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        {traceId && (
          <ErrorBoundary inline>
            <Suspense fallback={<SuspenseLoader />}>
              <TraceContent traceId={traceId} />
            </Suspense>
          </ErrorBoundary>
        )}
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button onClick={onClose}>닫기</Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
