import { Suspense, useState } from "react";
import { TextSnippetOutlined } from "hobom-design-system/icons";
import {
  PeriodSelector,
  SystemPeriodModel,
  type SystemPeriodType,
} from "@/entities/dashboard";
import { LogDashboardContent } from "@/features/dashboard-log";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const LogDashboardWorkspace = () => {
  const [period, setPeriod] = useState<SystemPeriodType>(
    SystemPeriodModel.LAST_24H,
  );

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
              bgcolor: "error.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextSnippetOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Hb.Box>
          <Hb.Box>
            <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              로그 모니터링
            </Hb.Text>
            <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
              API 요청 로그와 에러 현황을 모니터링할 수 있어요.
            </Hb.Text>
          </Hb.Box>
        </Hb.Box>
        <PeriodSelector type="system" period={period} onChange={setPeriod} />
      </Hb.Box>

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <LogDashboardContent period={period} />
        </Suspense>
      </ErrorBoundary>
    </Hb.Box>
  );
};
