import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import type { NotificationItemType } from "@/entities/notification";
import { NotificationItem } from "@/entities/notification/ui";
import { RoutesConfig } from "@/shared/config";
import { useInfiniteScroll } from "@/shared/model";
import { Hb } from "@/shared/ui";
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

  const { notifications, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useNotificationList(filter);
  const markRead = useMarkNotificationRead();
  const navigate = useNavigate();

  const handleScroll = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold: 100,
  });

  const renderList = () => {
    if (isPending) {
      return (
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          <Hb.Progress.Circular size={24} />
        </Hb.Box>
      );
    }
    if (notifications.length === 0) {
      return (
        <Hb.Box
          style={{
            paddingTop: 48,
            paddingBottom: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <NotificationsNoneOutlined sx={{ fontSize: 40, color: "text.disabled" }} />
          <Hb.Text
            variant="body2"
            style={{
              color: "var(--hb-color-text-disabled)",
            }}
          >
            {EMPTY_MESSAGES[filter]}
          </Hb.Text>
        </Hb.Box>
      );
    }

    return (
      <>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={(n: NotificationItemType) => {
              if (!n.isRead) {
                markRead.mutate(n.id);
              }
              onClose();
            }}
          />
        ))}
        {isFetchingNextPage && (
          <Hb.Box
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <Hb.Progress.Circular size={20} />
          </Hb.Box>
        )}
      </>
    );
  };

  return (
    <Hb.Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      style={{
        width: 380,
        maxHeight: 520,
        marginTop: 8,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Hb.Box
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 16,
          paddingBottom: 0,
        }}
      >
        <Hb.Text
          variant="h6"
          style={{
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          알림
        </Hb.Text>
      </Hb.Box>
      {/* Scoped rule for the tab buttons — a descendant selector StyleX/inline style can't reach. */}
      <style href="notification-panel-tabs" precedence="default">
        {`.notification-panel-tabs [role="tab"] { min-height: 40px; font-size: 0.8125rem; padding-left: 0; padding-right: 0; margin-right: 16px; min-width: auto; }`}
      </style>
      <Hb.Tabs.Root
        className="notification-panel-tabs"
        value={tab}
        onChange={(_, v) => setTab(v)}
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          minHeight: 40,
        }}
      >
        <Hb.Tabs.Item label="전체" />
        <Hb.Tabs.Item label="읽지 않음" />
        <Hb.Tabs.Item label="읽음" />
      </Hb.Tabs.Root>
      <Hb.Divider />
      <Hb.Box
        onScroll={handleScroll}
        style={{
          maxHeight: 380,
          overflowY: "auto",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
        }}
      >
        {renderList()}
      </Hb.Box>
      <Hb.Divider />
      <Hb.Box
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
          textAlign: "center",
        }}
      >
        <Hb.Button
          size="small"
          variant="ghost"
          onClick={() => {
            navigate(RoutesConfig.NOTIFICATION.LIST);
            onClose();
          }}
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--hb-color-accent)",
          }}
        >
          모든 알림 보기
        </Hb.Button>
      </Hb.Box>
    </Hb.Popover>
  );
};
