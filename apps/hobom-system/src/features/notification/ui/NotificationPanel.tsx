import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import type { NotificationItemType } from "@/entities/notification";
import { NotificationItem } from "@/entities/notification/ui";
import { RoutesConfig, SUBTLE_SCROLLBAR_SX } from "@/shared/config";
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

  return (
    <Hb.Popover
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
            boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
          },
        },
      }}
    >
      <Hb.Box sx={{ px: 2, pt: 2, pb: 0 }}>
        <Hb.Text variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
          알림
        </Hb.Text>
      </Hb.Box>
      <Hb.Tabs.Root
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
        <Hb.Tabs.Item label="전체" />
        <Hb.Tabs.Item label="읽지 않음" />
        <Hb.Tabs.Item label="읽음" />
      </Hb.Tabs.Root>
      <Hb.Divider />
      <Hb.Box
        onScroll={handleScroll}
        sx={{
          maxHeight: 380,
          overflowY: "auto",
          ...SUBTLE_SCROLLBAR_SX,
          maskImage:
            "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
        }}
      >
        {isPending ? (
          <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <Hb.Progress.Circular size={24} />
          </Hb.Box>
        ) : notifications.length === 0 ? (
          <Hb.Box
            sx={{
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <NotificationsNoneOutlined sx={{ fontSize: 40, color: "text.disabled" }} />
            <Hb.Text variant="body2" sx={{ color: "text.disabled" }}>
              {EMPTY_MESSAGES[filter]}
            </Hb.Text>
          </Hb.Box>
        ) : (
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
              <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <Hb.Progress.Circular size={20} />
              </Hb.Box>
            )}
          </>
        )}
      </Hb.Box>
      <Hb.Divider />
      <Hb.Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
        <Hb.Button
          size="small"
          variant="ghost"
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
        </Hb.Button>
      </Hb.Box>
    </Hb.Popover>
  );
};
