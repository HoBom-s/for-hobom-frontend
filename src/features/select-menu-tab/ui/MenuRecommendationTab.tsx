import { type ReactNode, useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { MenuRecommendationContent } from "@/features/select-menu-tab/ui/MenuRecommendationContent";
import { MenuRecommendationList } from "@/features/select-menu-tab/ui/MenuRecommendationList";
import { MenuRecommendationSpeedDial } from "@/features/select-menu-tab/ui/MenuRecommendationSpeedDial";
import { APPBAR_HEIGHT } from "@/shared/config";

// APPBAR_HEIGHT(56) + paper margins(~80) + MUI Tabs(48) + borders(~49)
const CONTENT_OFFSET = APPBAR_HEIGHT + 177;

interface TabValue {
  value: string;
  label: string;
}

const TAB_ITEMS: TabValue[] = [
  { value: "menu-recommendation", label: "메뉴 추천" },
  { value: "menu-list", label: "메뉴 목록" },
] as const;

export const MenuRecommendationTab = () => {
  const [tabValue, setTabValue] = useState<TabValue>(TAB_ITEMS[0]);

  return (
    <Paper
      elevation={2}
      sx={{
        width: "95%",
        m: "0 auto",
        mt: "6px",
        mb: 3,
        px: 4,
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        centered
        variant="fullWidth"
        value={tabValue.value}
        onChange={(_, value) => {
          const found: TabValue =
            TAB_ITEMS.find((item) => item.value === value) ?? TAB_ITEMS[0];
          setTabValue(found);
        }}
      >
        {TAB_ITEMS.map((item) => (
          <Tab key={item.value} value={item.value} label={item.label} />
        ))}
      </Tabs>
      <Box sx={{ mt: 1, height: `calc(100vh - ${CONTENT_OFFSET}px)` }}>
        <TabContent value={TAB_ITEMS[0]} tabValue={tabValue}>
          <MenuRecommendationContent />
        </TabContent>
        <TabContent value={TAB_ITEMS[1]} tabValue={tabValue}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5 }}>
            <MenuRecommendationSpeedDial />
          </Box>
          <MenuRecommendationList />
        </TabContent>
      </Box>
    </Paper>
  );
};

const TabContent = ({
  value,
  tabValue,
  children,
}: {
  value: TabValue;
  tabValue: TabValue;
  children: ReactNode;
}) => {
  if (tabValue.value !== value.value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      style={{ width: "100%", height: "calc(100% - 20px)", overflowY: "auto" }}
    >
      {children}
    </div>
  );
};
