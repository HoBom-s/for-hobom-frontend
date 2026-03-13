import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import type { ErrorEventDto } from "@/entities/error-event";
import { ERROR_TYPE_CHIP } from "./error-type-chip";

interface ErrorEventDetailDialogProps {
  event: ErrorEventDto | null;
  open: boolean;
  onClose: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string | null }) => (
  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
    <Typography
      variant="body2"
      sx={{ fontWeight: 600, minWidth: 80, color: "text.secondary" }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
      {value ?? "-"}
    </Typography>
  </Box>
);

export const ErrorEventDetailDialog = ({
  event,
  open,
  onClose,
}: ErrorEventDetailDialogProps) => {
  if (!event) return null;

  const chip = ERROR_TYPE_CHIP[event.errorType];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            에러 상세
          </Typography>
          <Chip
            label={chip.label}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              bgcolor: chip.bg,
              color: chip.color,
            }}
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseOutlined fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <InfoRow label="메시지" value={event.message} />
        <InfoRow label="화면" value={event.screen} />
        <InfoRow label="사용자" value={event.nickname} />
        <InfoRow label="User Agent" value={event.userAgent} />
        <InfoRow
          label="발생 시간"
          value={event.createdAt?.replace("T", " ").slice(0, 19) ?? "-"}
        />

        {event.stackTrace && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}
            >
              Stack Trace
            </Typography>
            <Box
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
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
