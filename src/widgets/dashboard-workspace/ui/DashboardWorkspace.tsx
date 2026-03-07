import { Suspense, useState, type ReactNode, type SyntheticEvent } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { DashboardOutlined } from "@mui/icons-material";
import { useRouterQuery } from "@/shared/model";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import {
  PeriodSelector,
  PeriodModel,
  type PeriodType,
} from "@/entities/dashboard";
import { ActivityDashboardContent } from "@/features/dashboard-activity";
import { DailyTodoDashboardContent } from "@/features/dashboard-daily-todo";
import { NoteDashboardContent } from "@/features/dashboard-note";
import { MessageDashboardContent } from "@/features/dashboard-message";
import { NotificationDashboardContent } from "@/features/dashboard-notification";

const TAB_VALUES = [
  "activity",
  "daily-todo",
  "note",
  "message",
  "notification",
] as const;
type TabValue = (typeof TAB_VALUES)[number];

const TAB_LABELS: Record<TabValue, string> = {
  activity: "활동 요약",
  "daily-todo": "할 일",
  note: "노트",
  message: "메시지",
  notification: "알림",
};

const TabPanel = ({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactNode;
}) => {
  if (!visible) return null;
  return <div role="tabpanel">{children}</div>;
};

export const DashboardWorkspace = () => {
  const { query, updateQuery } = useRouterQuery();
  const currentTab = (query.get("tab") as TabValue) || "activity";
  const [period, setPeriod] = useState<PeriodType>(PeriodModel.WEEKLY);
  const today = new Date().toISOString().slice(0, 10);

  const handleTabChange = (_: SyntheticEvent, value: TabValue) => {
    updateQuery({ tab: value }, { replace: true });
  };

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
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashboardOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              대시보드
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.25 }}
            >
              전체 활동과 서비스 현황을 한눈에 확인할 수 있어요.
            </Typography>
          </Box>
        </Box>
        <PeriodSelector period={period} onChange={setPeriod} />
      </Box>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 2.5 }}>
        {TAB_VALUES.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            label={TAB_LABELS[tab]}
            sx={{ minHeight: 44 }}
          />
        ))}
      </Tabs>

      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <TabPanel visible={currentTab === "activity"}>
            <ActivityDashboardContent period={period} date={today} />
          </TabPanel>
          <TabPanel visible={currentTab === "daily-todo"}>
            <DailyTodoDashboardContent period={period} date={today} />
          </TabPanel>
          <TabPanel visible={currentTab === "note"}>
            <NoteDashboardContent period={period} date={today} />
          </TabPanel>
          <TabPanel visible={currentTab === "message"}>
            <MessageDashboardContent period={period} date={today} />
          </TabPanel>
          <TabPanel visible={currentTab === "notification"}>
            <NotificationDashboardContent period={period} date={today} />
          </TabPanel>
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};
