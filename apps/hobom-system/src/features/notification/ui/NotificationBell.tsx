import { useState } from "react";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { useNotificationList } from "../model/useNotificationList";
import { NotificationPanel } from "./NotificationPanel";

export const NotificationBell = () => {
  const { unreadCount } = useNotificationList();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Hb.Button.Icon
        size="small"
        aria-label="알림"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          color: "text.secondary",
          "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
        }}
      >
        <Hb.Badge
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
        </Hb.Badge>
      </Hb.Button.Icon>
      {anchorEl != null && (
        <NotificationPanel
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        />
      )}
    </>
  );
};
