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
    <Box
      sx={{
        p: 3,
        maxWidth: 800,
        mx: "auto",
        height: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 2.5, flexShrink: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
          알림
        </Typography>
      </Box>
      <Paper
        elevation={1}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ px: 2, flexShrink: 0 }}>
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
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
            scrollbarGutter: "stable",
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
            "&:hover": {
              scrollbarColor: "rgba(0,0,0,0.15) transparent",
            },
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "transparent",
              borderRadius: 3,
              transition: "background-color 0.2s ease",
            },
            "&:hover::-webkit-scrollbar-thumb": {
              background: "rgba(0,0,0,0.15)",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(0,0,0,0.25)",
            },
          }}
        >
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
        </Box>
      </Paper>
    </Box>
  );
};
