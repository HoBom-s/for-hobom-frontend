import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import {
  NotificationItem,
  type NotificationItemType,
} from "@/entities/notification";
import { RoutesConfig } from "@/shared/config";
import { useNotificationList } from "../model/useNotificationList";
import { useMarkNotificationRead } from "../model/useMarkNotificationRead";
import { TAB_FILTERS, EMPTY_MESSAGES } from "../lib/notification-filter.lib";

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const NotificationPanel = ({ anchorEl, onClose }: Props) => {
  const [tab, setTab] = useState(0);

  const filter = TAB_FILTERS[tab];

  const { notifications } = useNotificationList(filter);
  const markRead = useMarkNotificationRead();
  const navigate = useNavigate();

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            width: 380,
            maxHeight: 520,
            mt: 1,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
          },
        },
      }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
          알림
        </Typography>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          px: 2,
          minHeight: 40,
          "& .MuiTab-root": {
            minHeight: 40,
            fontSize: "0.8125rem",
            px: 0,
            mr: 2,
            minWidth: "auto",
          },
        }}
      >
        <Tab label="전체" />
        <Tab label="읽지 않음" />
        <Tab label="읽음" />
      </Tabs>
      <Divider />
      <Box
        sx={{
          maxHeight: 380,
          overflowY: "auto",
          scrollbarGutter: "stable",

          // Firefox
          scrollbarWidth: "thin",
          scrollbarColor: "transparent transparent",
          "&:hover": {
            scrollbarColor: "rgba(0,0,0,0.15) transparent",
          },

          // Webkit (Chrome, Safari, Edge)
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "transparent",
            borderRadius: 3,
            transition: "background-color 0.2s ease",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(0,0,0,0.15)",
          },
          "&:hover::-webkit-scrollbar-thumb:hover": {
            bgcolor: "rgba(0,0,0,0.25)",
          },

          // Fade gradient at top/bottom to hint at more content
          maskImage:
            "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
        }}
      >
        {notifications.length === 0 ? (
          <Box
            sx={{
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NotificationsNoneOutlined
              sx={{ fontSize: 40, color: "text.disabled" }}
            />
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              {EMPTY_MESSAGES[filter]}
            </Typography>
          </Box>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClick={(notification: NotificationItemType) => {
                if (!notification.isRead) {
                  markRead.mutate(notification.id);
                }
                onClose();
              }}
            />
          ))
        )}
      </Box>
      <Divider />
      <Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
        <Button
          size="small"
          onClick={() => {
            navigate(RoutesConfig.NOTIFICATION.LIST);
            onClose();
          }}
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "primary.main",
          }}
        >
          모든 알림 보기
        </Button>
      </Box>
    </Popover>
  );
};
