import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { NotificationsActive } from "@mui/icons-material";

interface UnreadItem {
  id: string;
  title: string;
  createdAt: string;
  category: string;
}

interface UnreadAlertListProps {
  data: UnreadItem[];
}

export const UnreadAlertList = ({ data }: UnreadAlertListProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        미확인 알림
      </Typography>
      {data.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ py: 2, textAlign: "center" }}
        >
          미확인 알림이 없습니다
        </Typography>
      ) : (
        <List disablePadding>
          {data.slice(0, 5).map((item) => (
            <ListItem
              key={item.id}
              sx={{
                px: 0,
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              <NotificationsActive
                sx={{ color: "warning.main", mr: 1.5, fontSize: 20 }}
              />
              <ListItemText
                primary={item.title}
                secondary={item.createdAt.slice(0, 10)}
                primaryTypographyProps={{ variant: "body2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
              <Chip label={item.category} size="small" variant="outlined" />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
