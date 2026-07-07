import { Suspense } from "react";
import { BugReportOutlined } from "hobom-design-system/icons";
import { ErrorMonitoringContent } from "@/features/error-monitoring";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const ErrorMonitoringWorkspace = () => {
  return (
    <Hb.Box
      style={{
        padding: 24,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Hb.Box
            style={{
              width: 40,
              height: 40,
              borderRadius: 16,
              backgroundColor: "var(--hb-color-warning)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BugReportOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Hb.Box>
          <Hb.Box>
            <Hb.Text
              variant="h5"
              style={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              에러 모니터링
            </Hb.Text>
            <Hb.Text
              variant="body2"
              style={{
                color: "var(--hb-color-text-secondary)",
                marginTop: 2,
              }}
            >
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
