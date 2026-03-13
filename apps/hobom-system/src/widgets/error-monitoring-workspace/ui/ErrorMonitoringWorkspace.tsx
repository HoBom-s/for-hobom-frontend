import { Suspense } from "react";
import { BugReportOutlined } from "hobom-design-system/icons";
import { ErrorMonitoringContent } from "@/features/error-monitoring";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const ErrorMonitoringWorkspace = () => {
  return (
    <Hb.Box sx={{ p: 3 }}>
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Hb.Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "warning.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BugReportOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Hb.Box>
          <Hb.Box>
            <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              에러 모니터링
            </Hb.Text>
            <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
              클라이언트 및 서버 에러를 수집하고 모니터링할 수 있어요.
            </Hb.Text>
          </Hb.Box>
        </Hb.Box>
      </Hb.Box>

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <ErrorMonitoringContent />
        </Suspense>
      </ErrorBoundary>
    </Hb.Box>
  );
};
