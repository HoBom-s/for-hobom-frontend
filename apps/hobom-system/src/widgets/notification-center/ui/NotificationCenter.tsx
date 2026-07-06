import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import { NotificationItem } from "@/entities/notification/ui";
import { EMPTY_MESSAGES } from "@/features/notification";
import { SUBTLE_SCROLLBAR_SX } from "@/shared/config";
import { Hb } from "@/shared/ui";
import { useNotificationCenter } from "../model/useNotificationCenter";

export const NotificationCenter = () => {
  const {
    tab,
    setTab,
    filter,
    dateGroups,
    unreadCount,
    isPending,
    isFetchingNextPage,
    handleScroll,
    handleMarkRead,
  } = useNotificationCenter();

  const renderGroups = () => {
    if (isPending) {
      return (
        <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      );
    }
    if (dateGroups.length === 0) {
      return (
        <Hb.Box
          sx={{
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <NotificationsNoneOutlined sx={{ fontSize: 48, color: "text.disabled" }} />
          <Hb.Text
            variant="body2"
            style={{
              color: "var(--hb-color-text-disabled)",
              fontSize: "0.875rem",
            }}
          >
            {EMPTY_MESSAGES[filter]}
          </Hb.Text>
        </Hb.Box>
      );
    }

    return (
      <>
        {dateGroups.map((group) => (
          <Hb.Box key={group.label}>
            <Hb.Box sx={{ px: 2, py: 1, bgcolor: "rgba(0,0,0,0.02)" }}>
              <Hb.Text
                variant="caption"
                style={{
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                  color: "var(--hb-color-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {group.label}
              </Hb.Text>
            </Hb.Box>
            {group.items.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleMarkRead}
              />
            ))}
          </Hb.Box>
        ))}
        {isFetchingNextPage && (
          <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <Hb.Progress.Circular size={24} />
          </Hb.Box>
        )}
      </>
    );
  };

  return (
    <Hb.Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Hb.Box sx={{ mb: 2.5 }}>
        <Hb.Text
          variant="h6"
          style={{
            fontWeight: 700,
            fontSize: "1.125rem",
          }}
        >
          알림
        </Hb.Text>
      </Hb.Box>
      <Hb.Paper
        elevation={1}
        style={{
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <Hb.Box sx={{ px: 2 }}>
          <Hb.Tabs.Root
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
            <Hb.Tabs.Item label="전체" />
            <Hb.Tabs.Item label={unreadCount > 0 ? `읽지 않음 (${unreadCount})` : "읽지 않음"} />
            <Hb.Tabs.Item label="읽음" />
          </Hb.Tabs.Root>
        </Hb.Box>
        <Hb.Divider />
        <Hb.Box
          onScroll={handleScroll}
          sx={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            ...SUBTLE_SCROLLBAR_SX,
          }}
        >
          {renderGroups()}
        </Hb.Box>
      </Hb.Paper>
    </Hb.Box>
  );
};
