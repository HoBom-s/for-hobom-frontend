import { NotificationsActive } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

interface UnreadItem {
  id: string;
  title: string;
  createdAt: string;
  category: string;
}

interface UnreadAlertListProps {
  data: UnreadItem[];
}

export const UnreadAlertList = ({ data }: UnreadAlertListProps) => {
  return (
    <Hb.Box>
      <Hb.Text variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        미확인 알림
      </Hb.Text>
      {data.length === 0 ? (
        <Hb.Text
          variant="body2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          미확인 알림이 없습니다
        </Hb.Text>
      ) : (
        <Hb.List.Root disablePadding>
          {data.slice(0, 5).map((item) => (
            <Hb.List.Item
              key={item.id}
              sx={{
                px: 0,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              <NotificationsActive
                sx={{ color: "warning.main", mr: 1.5, fontSize: 20 }}
              />
              <Hb.List.ItemText
                primary={item.title}
                secondary={item.createdAt.slice(0, 10)}
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
              <Hb.Chip label={item.category} size="small" variant="outlined" />
            </Hb.List.Item>
          ))}
        </Hb.List.Root>
      )}
    </Hb.Box>
  );
};
