import { useRouterQuery } from "@/shared/model";
import { Hb } from "@/shared/ui";

export const FutureMessageStatusTab = () => {
  const { query, updateQuery } = useRouterQuery();
  const tabValue = query.get("status") || "SENT";

  return (
    <Hb.Tabs.Root
      style={{ paddingLeft: 16, paddingRight: 16 }}
      value={tabValue}
      onChange={(_, value) => updateQuery({ status: value })}
    >
      <Hb.Tabs.Item
        label="발송 완료"
        value="SENT"
        style={{
          fontWeight: tabValue === "SENT" ? 700 : 500,
        }}
      />
      <Hb.Tabs.Item
        label="발송 대기"
        value="PENDING"
        style={{
          fontWeight: tabValue === "PENDING" ? 700 : 500,
        }}
      />
    </Hb.Tabs.Root>
  );
};
