import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";

interface UpcomingMessage {
  id: string;
  title: string;
  recipientId: string;
  scheduledAt: string;
}

interface UpcomingMessageTimelineProps {
  data: UpcomingMessage[];
}

const getDDay = (scheduledAt: string) => {
  const diff = Math.ceil(
    (new Date(scheduledAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  return Math.max(0, diff);
};

export const UpcomingMessageTimeline = ({
  data,
}: UpcomingMessageTimelineProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        예정된 메시지
      </Typography>
      {data.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          예정된 메시지가 없습니다
        </Typography>
      ) : (
        <List disablePadding>
          {data.map((msg) => {
            const dDay = getDDay(msg.scheduledAt);
            return (
              <ListItem
                key={msg.id}
                sx={{
                  px: 0,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Schedule
                  sx={{ color: "text.secondary", mr: 1.5, fontSize: 20 }}
                />
                <ListItemText
                  primary={msg.title}
                  secondary={msg.scheduledAt.slice(0, 10)}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
                <Chip
                  label={dDay === 0 ? "D-Day" : `D-${dDay}`}
                  size="small"
                  color={dDay <= 3 ? "error" : "default"}
                  variant="outlined"
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};
