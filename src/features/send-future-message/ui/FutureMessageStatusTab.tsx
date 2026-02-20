import { Tab, Tabs } from "@mui/material";
import { useRouterQuery } from "@/shared/model";

export const FutureMessageStatusTab = () => {
  const { query, updateQuery } = useRouterQuery();
  const tabValue = query.get("status") || "PENDING";
  return (
    <Tabs
      sx={{ px: 3 }}
      textColor="primary"
      indicatorColor="primary"
      variant="fullWidth"
      value={tabValue}
      onChange={() => {
        updateQuery({ status: tabValue === "PENDING" ? "SENT" : "PENDING" });
      }}
      aria-label="미래 메시지 발송 상태 탭"
    >
      <Tab
        label="발송 대기"
        value="PENDING"
        sx={{ fontWeight: tabValue === "PENDING" ? "bold" : "normal" }}
      />
      <Tab
        label="발송 완료"
        value="SENT"
        sx={{ fontWeight: tabValue === "SENT" ? "bold" : "normal" }}
      />
    </Tabs>
  );
};
