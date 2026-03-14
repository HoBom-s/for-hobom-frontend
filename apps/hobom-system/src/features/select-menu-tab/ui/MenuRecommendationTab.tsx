import { type ReactNode, useState } from "react";
import { MenuRecommendationContent } from "@/features/select-menu-tab/ui/MenuRecommendationContent";
import { MenuRecommendationList } from "@/features/select-menu-tab/ui/MenuRecommendationList";
import { MenuRecommendationSpeedDial } from "@/features/select-menu-tab/ui/MenuRecommendationSpeedDial";
import { Hb } from "@/shared/ui";

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
      sx={{
        flex: 1,
        mx: 3,
        mb: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          pr: 2,
        }}
      >
        <Hb.Tabs.Root
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            minHeight: 44,
            "& .MuiTab-root": {
              minHeight: 44,
              textTransform: "none",
              fontWeight: 600,
              fontSize: 13,
            },
          }}
        >
          {TAB_VALUES.map((v) => (
            <Hb.Tabs.Item key={v} value={v} label={TAB_LABELS[v]} />
          ))}
        </Hb.Tabs.Root>
        {tab === "list" && <MenuRecommendationSpeedDial />}
      </Hb.Box>

      <Hb.Box sx={{ flex: 1, overflow: "auto" }}>
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
