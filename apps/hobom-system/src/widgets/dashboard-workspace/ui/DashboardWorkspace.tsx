import { Suspense, useState, type ReactNode, type SyntheticEvent } from "react";
import { DashboardOutlined } from "hobom-design-system/icons";
import { useRouterQuery } from "@/shared/model";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { PeriodModel, type PeriodType } from "@/entities/dashboard";
import { PeriodSelector } from "@/entities/dashboard/ui";
import { ActivityDashboardContent } from "@/features/dashboard-activity";
import { DailyTodoDashboardContent } from "@/features/dashboard-daily-todo";
import { NoteDashboardContent } from "@/features/dashboard-note";
import { MessageDashboardContent } from "@/features/dashboard-message";
import { NotificationDashboardContent } from "@/features/dashboard-notification";

const TAB_VALUES = ["activity", "daily-todo", "note", "message", "notification"] as const;

type TabValue = (typeof TAB_VALUES)[number];

const TAB_LABELS: Record<TabValue, string> = {
  activity: "활동 요약",
  "daily-todo": "할 일",
  note: "노트",
  message: "메시지",
  notification: "알림",
};

const TabPanel = ({ visible, children }: { visible: boolean; children: ReactNode }) => {
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
              backgroundColor: "var(--hb-color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashboardOutlined sx={{ color: "#fff", fontSize: 22 }} />
          </Hb.Box>
          <Hb.Box>
            <Hb.Text
              variant="h5"
              style={{
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              대시보드
            </Hb.Text>
            <Hb.Text
              variant="body2"
              style={{
                color: "var(--hb-color-text-secondary)",
                marginTop: 2,
              }}
            >
              전체 활동과 서비스 현황을 한눈에 확인할 수 있어요.
            </Hb.Text>
          </Hb.Box>
        </Hb.Box>
        <PeriodSelector period={period} onChange={setPeriod} />
      </Hb.Box>
      <Hb.Tabs.Root value={currentTab} onChange={handleTabChange} sx={{ mb: 2.5 }}>
        {TAB_VALUES.map((tab) => (
          <Hb.Tabs.Item key={tab} value={tab} label={TAB_LABELS[tab]} sx={{ minHeight: 44 }} />
        ))}
      </Hb.Tabs.Root>
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
    </Hb.Box>
  );
};
