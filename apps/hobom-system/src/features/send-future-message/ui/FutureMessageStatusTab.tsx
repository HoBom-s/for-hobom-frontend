import { useRouterQuery } from "@/shared/model";
import { Hb } from "@/shared/ui";

export const FutureMessageStatusTab = () => {
  const { query, updateQuery } = useRouterQuery();
  const tabValue = query.get("status") || "SENT";

  return (
    <Hb.Tabs.Root
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
      <Hb.Tabs.Item
        label="발송 완료"
        value="SENT"
        sx={{ fontWeight: tabValue === "SENT" ? 700 : 500 }}
      />
      <Hb.Tabs.Item
        label="발송 대기"
        value="PENDING"
        sx={{ fontWeight: tabValue === "PENDING" ? 700 : 500 }}
      />
    </Hb.Tabs.Root>
  );
};
