import { Tab, Tabs } from "@mui/material";
import { useRouterQuery } from "@/shared/model";

export const FutureMessageStatusTab = () => {
  const { query, updateQuery } = useRouterQuery();
  const tabValue = query.get("status") || "SENT";

  return (
    <Tabs
      sx={{
        px: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        "& .MuiTabs-indicator": { height: 2.5, borderRadius: 1 },
      }}
      textColor="primary"
      indicatorColor="primary"
      value={tabValue}
      onChange={(_, value) => updateQuery({ status: value })}
    >
      <Tab
        label="발송 완료"
        value="SENT"
        sx={{ fontWeight: tabValue === "SENT" ? 700 : 500 }}
      />
      <Tab
        label="발송 대기"
        value="PENDING"
        sx={{ fontWeight: tabValue === "PENDING" ? 700 : 500 }}
      />
    </Tabs>
  );
};
