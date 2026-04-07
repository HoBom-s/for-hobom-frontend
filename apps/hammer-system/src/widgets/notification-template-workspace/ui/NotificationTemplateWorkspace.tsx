import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { NotificationTemplateContent } from "@/features/manage-notification-templates";

export const NotificationTemplateWorkspace = () => {
  return (
    <Hb.Box sx={{ p: 3 }}>
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Hb.Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NotificationsNoneOutlined sx={{ color: "#fff", fontSize: 22 }} />
        </Hb.Box>
        <Hb.Box>
          <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            Notification Templates
          </Hb.Text>
          <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
            알림 템플릿을 관리할 수 있어요.
          </Hb.Text>
        </Hb.Box>
      </Hb.Box>

      <NotificationTemplateContent />
    </Hb.Box>
  );
};
