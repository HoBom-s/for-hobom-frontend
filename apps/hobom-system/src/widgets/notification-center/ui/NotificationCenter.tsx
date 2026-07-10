import * as stylex from "@stylexjs/stylex";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import { NotificationItem } from "@/entities/notification/ui";
import { EMPTY_MESSAGES } from "@/features/notification";
import { Hb } from "@/shared/ui";
import { useNotificationCenter } from "../model/useNotificationCenter";

// Ported from SUBTLE_SCROLLBAR_SX (light mode) — Hb.Box no longer accepts sx.
const styles = stylex.create({
  scrollArea: {
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto",
    scrollbarGutter: "stable",
    scrollbarWidth: "thin",
    scrollbarColor: {
      default: "transparent transparent",
      ":hover": "rgba(0,0,0,0.15) transparent",
    },
    "::-webkit-scrollbar": { width: 6 },
    "::-webkit-scrollbar-track": { background: "transparent" },
    "::-webkit-scrollbar-thumb": {
      background: { default: "transparent", ":hover": "rgba(0,0,0,0.25)" },
      borderRadius: 3,
      transition: "background-color 0.2s ease",
    },
  },
});

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
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 64,
            paddingBottom: 64,
          }}
        >
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      );
    }
    if (dateGroups.length === 0) {
      return (
        <Hb.Box
          style={{
            paddingTop: 64,
            paddingBottom: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
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
            {filter ? EMPTY_MESSAGES[filter] : null}
          </Hb.Text>
        </Hb.Box>
      );
    }

    return (
      <>
        {dateGroups.map((group) => (
          <Hb.Box key={group.label}>
            <Hb.Box
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: "rgba(0,0,0,0.02)",
              }}
            >
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
          <Hb.Box
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <Hb.Progress.Circular size={24} />
          </Hb.Box>
        )}
      </>
    );
  };

  return (
    <Hb.Box style={{ padding: 24, maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}>
      <Hb.Box
        style={{
          marginBottom: 20,
        }}
      >
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
        <Hb.Box
          style={{
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Scoped rule for the tab buttons — a descendant selector StyleX/inline style can't reach. */}
          <style href="notification-center-tabs" precedence="default">
            {`.notification-center-tabs [role="tab"] { min-height: 44px; font-size: 0.875rem; padding-left: 0; padding-right: 0; margin-right: 20px; min-width: auto; }`}
          </style>
          <Hb.Tabs.Root
            className="notification-center-tabs"
            value={tab}
            onChange={(_, v) => setTab(v)}
            style={{ minHeight: 44 }}
          >
            <Hb.Tabs.Item label="전체" />
            <Hb.Tabs.Item label={unreadCount > 0 ? `읽지 않음 (${unreadCount})` : "읽지 않음"} />
            <Hb.Tabs.Item label="읽음" />
          </Hb.Tabs.Root>
        </Hb.Box>
        <Hb.Divider />
        <Hb.Box onScroll={handleScroll} {...stylex.props(styles.scrollArea)}>
          {renderGroups()}
        </Hb.Box>
      </Hb.Paper>
    </Hb.Box>
  );
};
