import { Suspense, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { TextSnippetOutlined } from "@mui/icons-material";
import {
  PeriodSelector,
  SystemPeriodModel,
  type SystemPeriodType,
} from "@/entities/dashboard";
import { LogDashboardContent } from "@/features/dashboard-log";

export const LogDashboardWorkspace = () => {
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
              bgcolor: "error.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextSnippetOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              로그 모니터링
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.25 }}
            >
              API 요청 로그와 에러 현황을 모니터링할 수 있어요.
            </Typography>
          </Box>
        </Box>
        <PeriodSelector type="system" period={period} onChange={setPeriod} />
      </Box>

      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        }
      >
        <LogDashboardContent period={period} />
      </Suspense>
    </Box>
  );
};
