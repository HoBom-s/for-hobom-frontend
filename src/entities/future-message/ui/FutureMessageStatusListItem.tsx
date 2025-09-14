import { type ReactNode } from "react";
import {
  Chip,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { FutureMessageType } from "@/entities/future-message/api/future-message.type.ts";
import {
  convertStatusToMessage,
  type FutureMessageSendStatusType,
  isPendingMessageSendStatus,
} from "@/entities/future-message/model/future-message-send-status.model.ts";

export const FutureMessageStatusListItem = ({
  item,
  showDivider,
  rightAddon = null,
}: {
  item: FutureMessageType;
  showDivider: boolean;
  rightAddon?: ReactNode;
}) => {
  return (
    <div style={{ marginBottom: "4px" }}>
      <ListItem alignItems="flex-start" secondaryAction={rightAddon}>
        <ListItemText
          primary={
            <Typography component="span" variant="subtitle2" fontWeight="bold">
              {item.title?.length > 20
                ? item.title.slice(0, 15) + "..."
                : item.title}
            </Typography>
          }
          secondary={
            <Description
              status={item.sendStatus}
              scheduledAt={item.scheduledAt}
            />
          }
        />
      </ListItem>
      {showDivider ? <Divider /> : null}
    </div>
  );
};

const Description = ({
  status,
  scheduledAt,
}: {
  status: FutureMessageSendStatusType;
  scheduledAt: string;
}) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography
      component="span"
      variant="body2"
      sx={{ color: "text.primary", display: "inline" }}
    >
      {scheduledAt}
    </Typography>
    <Chip
      size="small"
      color={isPendingMessageSendStatus(status) ? "warning" : "primary"}
      label={convertStatusToMessage(status)}
    />
  </Stack>
);
