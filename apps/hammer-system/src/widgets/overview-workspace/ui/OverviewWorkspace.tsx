import { Suspense, useState } from "react";
import { DashboardOutlined } from "hobom-design-system/icons";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { OverviewContent } from "@/features/overview-dashboard";
import { TraceDetailDialog } from "@/features/log-explorer";

export const OverviewWorkspace = () => {
  const [selectedTraceId, setSelectedTraceId] = useState<string | null>(null);

  return (
    <Hb.Box sx={{ p: 3 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Hb.Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DashboardOutlined sx={{ color: "#fff", fontSize: 22 }} />
        </Hb.Box>
        <Hb.Box>
          <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            Overview
          </Hb.Text>
          <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
            트래픽, 레이턴시, 에러 현황을 한눈에 확인할 수 있어요.
          </Hb.Text>
        </Hb.Box>
      </Hb.Box>

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <OverviewContent onTraceClick={setSelectedTraceId} />
        </Suspense>
      </ErrorBoundary>

      <TraceDetailDialog traceId={selectedTraceId} onClose={() => setSelectedTraceId(null)} />
    </Hb.Box>
  );
};
