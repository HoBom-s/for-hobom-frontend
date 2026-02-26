import { useState } from "react";
import { IconButton, Badge } from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import { useNotificationList } from "../model/useNotificationList";
import { NotificationPanel } from "./NotificationPanel";

export const NotificationBell = () => {
  const { unreadCount } = useNotificationList();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          color: "text.secondary",
          "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          max={99}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.625rem",
              height: 16,
              minWidth: 16,
              px: 0.5,
            },
          }}
        >
          <NotificationsNoneOutlined sx={{ fontSize: 22 }} />
        </Badge>
      </IconButton>
      {anchorEl == null ? null : (
        <NotificationPanel
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        />
      )}
    </>
  );
};
