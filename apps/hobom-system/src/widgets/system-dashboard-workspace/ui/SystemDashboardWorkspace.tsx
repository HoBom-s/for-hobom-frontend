import { Suspense, useState } from "react";
import { MonitorHeartOutlined } from "hobom-design-system/icons";
import { SystemPeriodModel, type SystemPeriodType } from "@/entities/dashboard";
import { PeriodSelector } from "@/entities/dashboard/ui";
import { SystemDashboardContent } from "@/features/dashboard-system";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const SystemDashboardWorkspace = () => {
  const [period, setPeriod] = useState<SystemPeriodType>(SystemPeriodModel.LAST_24H);

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
            <MonitorHeartOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Hb.Box>
          <Hb.Box>
            <Hb.Text
              variant="h5"
              style={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              시스템 모니터링
            </Hb.Text>
            <Hb.Text
              variant="body2"
              style={{
                color: "var(--hb-color-text-secondary)",
                marginTop: 2,
              }}
            >
              이벤트 처리 상태와 실패 현황을 모니터링할 수 있어요.
            </Hb.Text>
          </Hb.Box>
        </Hb.Box>
        <PeriodSelector type="system" period={period} onChange={setPeriod} />
      </Hb.Box>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <SystemDashboardContent period={period} />
        </Suspense>
      </ErrorBoundary>
    </Hb.Box>
  );
};
