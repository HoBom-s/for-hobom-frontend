import * as stylex from "@stylexjs/stylex";
import { NotificationsActive } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

const styles = stylex.create({
  item: {
    paddingInline: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
    ":last-child": { borderBottomStyle: "none" },
  },
});

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
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 8,
        }}
      >
        미확인 알림
      </Hb.Text>
      {data.length === 0 ? (
        <Hb.Text
          variant="body2"
          color="text.secondary"
          style={{
            paddingTop: 16,
            paddingBottom: 16,
            textAlign: "center",
          }}
        >
          미확인 알림이 없습니다
        </Hb.Text>
      ) : (
        <Hb.List.Root disablePadding>
          {data.slice(0, 5).map((item) => (
            <Hb.List.Item key={item.id} {...stylex.props(styles.item)}>
              <NotificationsActive sx={{ color: "warning.main", mr: 1.5, fontSize: 20 }} />
              <Hb.List.ItemText
                primary={item.title}
                secondary={item.createdAt.slice(0, 10)}
                primaryStyle={{ fontSize: "0.875rem" }}
                secondaryStyle={{ fontSize: "0.75rem" }}
              />
              <Hb.Chip label={item.category} size="small" variant="outlined" />
            </Hb.List.Item>
          ))}
        </Hb.List.Root>
      )}
    </Hb.Box>
  );
};
