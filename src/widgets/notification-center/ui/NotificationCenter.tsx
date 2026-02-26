import { useMemo, useState } from "react";
import { Box, Paper, Typography, Tabs, Tab, Divider } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import {
  NotificationItem,
  groupNotificationsByDate,
  type NotificationItemType,
} from "@/entities/notification";
import {
  useNotificationList,
  useMarkNotificationRead,
  TAB_FILTERS,
  EMPTY_MESSAGES,
} from "@/features/notification";

export const NotificationCenter = () => {
  const [tab, setTab] = useState(0);
  const filter = TAB_FILTERS[tab];
  const { notifications, unreadCount } = useNotificationList(filter);
  const markRead = useMarkNotificationRead();
  const dateGroups = useMemo(
    () => groupNotificationsByDate(notifications),
    [notifications],
  );

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
          알림
        </Typography>
      </Box>
      <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ px: 2 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              minHeight: 44,
              "& .MuiTab-root": {
                minHeight: 44,
                fontSize: "0.875rem",
                px: 0,
                mr: 2.5,
                minWidth: "auto",
              },
            }}
          >
            <Tab label="전체" />
            <Tab
              label={
                unreadCount > 0 ? `읽지 않음 (${unreadCount})` : "읽지 않음"
              }
            />
            <Tab label="읽음" />
          </Tabs>
        </Box>
        <Divider />
        {dateGroups.length === 0 ? (
          <Box
            sx={{
              py: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <NotificationsNoneOutlined
              sx={{ fontSize: 48, color: "text.disabled" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "text.disabled", fontSize: "0.875rem" }}
            >
              {EMPTY_MESSAGES[filter]}
            </Typography>
          </Box>
        ) : (
          dateGroups.map((group) => (
            <Box key={group.label}>
              <Box sx={{ px: 2, py: 1, bgcolor: "rgba(0,0,0,0.02)" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.6875rem",
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {group.label}
                </Typography>
              </Box>
              {group.items.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={(notification: NotificationItemType) => {
                    if (!notification.isRead) {
                      markRead.mutate(notification.id);
                    }
                  }}
                />
              ))}
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};
