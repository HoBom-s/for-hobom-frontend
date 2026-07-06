import { CloseOutlined } from "hobom-design-system/icons";
import type { ErrorEventDto } from "@/entities/error-event";
import { Hb } from "@/shared/ui";
import { ERROR_TYPE_CHIP } from "./error-type-chip";

interface ErrorEventDetailDialogProps {
  event: ErrorEventDto | null;
  open: boolean;
  onClose: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string | null }) => (
  <Hb.Box sx={{ display: "flex", gap: 1, mb: 1 }}>
    <Hb.Text
      variant="body2"
      style={{
        fontWeight: 600,
        minWidth: 80,
        color: "var(--hb-color-text-secondary)",
      }}
    >
      {label}
    </Hb.Text>
    <Hb.Text
      variant="body2"
      style={{
        wordBreak: "break-all",
      }}
    >
      {value ?? "-"}
    </Hb.Text>
  </Hb.Box>
);

export const ErrorEventDetailDialog = ({ event, open, onClose }: ErrorEventDetailDialogProps) => {
  if (!event) return null;

  const chip = ERROR_TYPE_CHIP[event.errorType];

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="md">
      <Hb.Dialog.Title
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Hb.Text
            variant="h6"
            style={{
              fontWeight: 700,
            }}
          >
            에러 상세
          </Hb.Text>
          <Hb.Chip
            label={chip.label}
            size="small"
            style={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              backgroundColor: chip.bg,
              color: chip.color,
            }}
          />
        </Hb.Box>
        <Hb.Button.Icon onClick={onClose} size="small">
          <CloseOutlined fontSize="small" />
        </Hb.Button.Icon>
      </Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <InfoRow label="메시지" value={event.message} />
        <InfoRow label="화면" value={event.screen} />
        <InfoRow label="사용자" value={event.nickname} />
        <InfoRow label="User Agent" value={event.userAgent} />
        <InfoRow label="발생 시간" value={event.createdAt?.replace("T", " ").slice(0, 19) ?? "-"} />

        {event.stackTrace && (
          <Hb.Box sx={{ mt: 2 }}>
            <Hb.Text
              variant="body2"
              style={{
                fontWeight: 600,
                color: "var(--hb-color-text-secondary)",
                marginBottom: 8,
              }}
            >
              Stack Trace
            </Hb.Text>
            <Hb.Box
              component="pre"
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: "action.hover",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                overflow: "auto",
                maxHeight: 400,
                whiteSpace: "pre",
                m: 0,
              }}
            >
              {event.stackTrace}
            </Hb.Box>
          </Hb.Box>
        )}
      </Hb.Dialog.Content>
    </Hb.Dialog.Root>
  );
};
