import { type ReactNode, useState } from "react";
import { Hb } from "@/shared/ui";
import { MenuRecommendationContent } from "./MenuRecommendationContent";
import { MenuRecommendationList } from "./MenuRecommendationList";
import { MenuRecommendationSpeedDial } from "./MenuRecommendationSpeedDial";

const TAB_VALUES = ["recommendation", "list"] as const;

type TabValue = (typeof TAB_VALUES)[number];

const TAB_LABELS: Record<TabValue, string> = {
  recommendation: "메뉴 추천",
  list: "메뉴 목록",
};

export const MenuRecommendationTab = () => {
  const [tab, setTab] = useState<TabValue>("recommendation");

  return (
    <Hb.Paper
      elevation={0}
      style={{
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "var(--hb-color-border)",
        borderRadius: 16,
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "var(--hb-color-border)",
          paddingRight: 16,
        }}
      >
        {/* Scoped rule for the tab buttons — a descendant selector StyleX/inline style can't reach. */}
        <style href="menu-recommendation-tabs" precedence="default">
          {`.menu-recommendation-tabs [role="tab"] { min-height: 44px; text-transform: none; font-weight: 600; font-size: 13px; }`}
        </style>
        <Hb.Tabs.Root
          className="menu-recommendation-tabs"
          value={tab}
          onChange={(_, v) => setTab(v)}
          style={{ minHeight: 44 }}
        >
          {TAB_VALUES.map((v) => (
            <Hb.Tabs.Item key={v} value={v} label={TAB_LABELS[v]} />
          ))}
        </Hb.Tabs.Root>
        {tab === "list" && <MenuRecommendationSpeedDial />}
      </Hb.Box>
      <Hb.Box
        style={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <TabPanel visible={tab === "recommendation"}>
          <MenuRecommendationContent />
        </TabPanel>
        <TabPanel visible={tab === "list"}>
          <MenuRecommendationList />
        </TabPanel>
      </Hb.Box>
    </Hb.Paper>
  );
};

const TabPanel = ({ visible, children }: { visible: boolean; children: ReactNode }) => {
  if (!visible) return null;

  return (
    <div role="tabpanel" style={{ height: "100%" }}>
      {children}
    </div>
  );
};
