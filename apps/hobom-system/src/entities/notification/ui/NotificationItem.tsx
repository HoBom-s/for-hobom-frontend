import { memo } from "react";
import * as stylex from "@stylexjs/stylex";
import { InfoOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { NOTIFICATION_CATEGORY } from "../lib/notification-category.lib";
import { formatRelativeTime } from "../lib/format-relative-time.lib";
import type { NotificationCategory, NotificationItemType } from "../api/notification.type";

const CATEGORY_ICONS: Record<NotificationCategory, typeof InfoOutlined> = {
  SYSTEM: InfoOutlined,
};

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    paddingInline: 16,
    paddingBlock: 12,
    width: "100%",
    textAlign: "left",
    transition: "background-color 0.15s ease",
  },
  read: {
    backgroundColor: { default: "transparent", ":hover": "rgba(0,0,0,0.02)" },
  },
  unread: {
    backgroundColor: {
      default: "rgba(70, 128, 255, 0.04)",
      ":hover": "rgba(70, 128, 255, 0.07)",
    },
  },
});

interface Props {
  notification: NotificationItemType;
  onClick?: (notification: NotificationItemType) => void;
}

export const NotificationItem = memo(function NotificationItem({ notification, onClick }: Props) {
  const meta = NOTIFICATION_CATEGORY[notification.category];
  const Icon = CATEGORY_ICONS[notification.category];

  return (
    <Hb.ButtonBase
      onClick={() => onClick?.(notification)}
      {...stylex.props(styles.root, notification.isRead ? styles.read : styles.unread)}
    >
      <Hb.Box
        style={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          backgroundColor: meta.bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <Icon sx={{ fontSize: 18, color: meta.color }} />
      </Hb.Box>
      <Hb.Box
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 2,
          }}
        >
          <Hb.Text
            variant="body2"
            style={{
              fontWeight: notification.isRead ? 400 : 600,
              fontSize: "0.8125rem",
              lineHeight: 1.4,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {notification.title}
          </Hb.Text>
          {!notification.isRead && (
            <>
              <Hb.Box
                aria-hidden="true"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "var(--hb-color-accent)",
                  flexShrink: 0,
                }}
              />
              <Hb.Box
                component="span"
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  whiteSpace: "nowrap",
                }}
              >
                읽지 않음
              </Hb.Box>
            </>
          )}
        </Hb.Box>
        <Hb.Text
          variant="body2"
          style={{
            color: "var(--hb-color-text-secondary)",
            fontSize: "0.75rem",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: 4,
          }}
        >
          {notification.body}
        </Hb.Text>
        <Hb.Text
          variant="caption"
          style={{
            color: "var(--hb-color-text-disabled)",
            fontSize: "0.6875rem",
          }}
        >
          {formatRelativeTime(notification.createdAt)}
        </Hb.Text>
      </Hb.Box>
    </Hb.ButtonBase>
  );
});
