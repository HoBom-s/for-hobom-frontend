import { Suspense, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MonitorHeartOutlined } from "@mui/icons-material";
import {
  PeriodSelector,
  SystemPeriodModel,
  type SystemPeriodType,
} from "@/entities/dashboard";
import { SystemDashboardContent } from "@/features/dashboard-system";
import { SuspenseLoader } from "@/shared/ui";

export const SystemDashboardWorkspace = () => {
  const [period, setPeriod] = useState<SystemPeriodType>(
    SystemPeriodModel.LAST_24H,
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
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
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              시스템 모니터링
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.25 }}
            >
              이벤트 처리 상태와 실패 현황을 모니터링할 수 있어요.
            </Typography>
          </Box>
        </Box>
        <PeriodSelector type="system" period={period} onChange={setPeriod} />
      </Box>

      <Suspense fallback={<SuspenseLoader />}>
        <SystemDashboardContent period={period} />
      </Suspense>
    </Box>
  );
};
