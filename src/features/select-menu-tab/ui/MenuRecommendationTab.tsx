import { type ReactNode, useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { MenuRecommendationContent } from "@/features/select-menu-tab/ui/MenuRecommendationContent";
import { MenuRecommendationList } from "@/features/select-menu-tab/ui/MenuRecommendationList";

interface TabValue {
  value: string;
  label: string;
}

const TAB_ITEMS: TabValue[] = [
  { value: "menu-recommendation", label: "Recommendation" },
  { value: "menu-list", label: "Menus" },
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
      <Box sx={{ mt: 1, height: "calc(100vh - 265px)" }}>
        <TabContent value={TAB_ITEMS[0]} tabValue={tabValue}>
          <MenuRecommendationContent />
        </TabContent>
        <TabContent value={TAB_ITEMS[1]} tabValue={tabValue}>
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
