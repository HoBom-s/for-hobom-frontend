import { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { BugReportOutlined } from "@mui/icons-material";
import { ErrorMonitoringContent } from "@/features/error-monitoring";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export const ErrorMonitoringWorkspace = () => {
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
            <BugReportOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              에러 모니터링
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.25 }}
            >
              클라이언트 및 서버 에러를 수집하고 모니터링할 수 있어요.
            </Typography>
          </Box>
        </Box>
      </Box>

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <ErrorMonitoringContent />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};
