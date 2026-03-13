import { Box, Typography, ButtonBase } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { NOTIFICATION_CATEGORY } from "../lib/notification-category.lib";
import { formatRelativeTime } from "../lib/format-relative-time.lib";
import type {
  NotificationCategory,
  NotificationItemType,
} from "../api/notification.type";

const CATEGORY_ICONS: Record<NotificationCategory, typeof InfoOutlined> = {
  SYSTEM: InfoOutlined,
};

interface Props {
  notification: NotificationItemType;
  onClick?: (notification: NotificationItemType) => void;
}

export const NotificationItem = ({ notification, onClick }: Props) => {
  const meta = NOTIFICATION_CATEGORY[notification.category];
  const Icon = CATEGORY_ICONS[notification.category];

  return (
    <ButtonBase
      onClick={() => onClick?.(notification)}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        px: 2,
        py: 1.5,
        width: "100%",
        textAlign: "left",
        bgcolor: notification.isRead
          ? "transparent"
          : "rgba(70, 128, 255, 0.04)",
        transition: "background-color 0.15s ease",
        "&:hover": {
          bgcolor: notification.isRead
            ? "rgba(0,0,0,0.02)"
            : "rgba(70, 128, 255, 0.07)",
        },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          bgcolor: meta.bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <Icon sx={{ fontSize: 18, color: meta.color }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.25 }}
        >
          <Typography
            variant="body2"
            sx={{
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
          </Typography>
          {!notification.isRead && (
            <>
              <Box
                aria-hidden="true"
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  flexShrink: 0,
                }}
              />
              <Box
                component="span"
                sx={{
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
              </Box>
            </>
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 0.5,
          }}
        >
          {notification.body}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            fontSize: "0.6875rem",
          }}
        >
          {formatRelativeTime(notification.createdAt)}
        </Typography>
      </Box>
    </ButtonBase>
  );
};
