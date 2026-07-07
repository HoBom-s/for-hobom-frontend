import { useState } from "react";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";
import { useNotificationList } from "../model/useNotificationList";
import { NotificationPanel } from "./NotificationPanel";

const styles = stylex.create({
  bell: {
    color: "var(--hb-color-text-secondary)",
    ":hover": { backgroundColor: "rgba(0,0,0,0.04)" },
  },
});

export const NotificationBell = () => {
  const { unreadCount } = useNotificationList();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <Hb.Button.Icon
        size="small"
        aria-label="알림"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        {...stylex.props(styles.bell)}
      >
        <Hb.Badge badgeContent={unreadCount} max={99} color="error">
          <NotificationsNoneOutlined sx={{ fontSize: 22 }} />
        </Hb.Badge>
      </Hb.Button.Icon>
      {anchorEl != null && (
        <NotificationPanel anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
      )}
    </>
  );
};
