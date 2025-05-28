import { MoreVert } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export const DailyTodoListItem = () => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <MoreVert />
        </IconButton>
      }
    >
      <ListItemButton dense>
        <ListItemIcon>
          <Checkbox edge="start" tabIndex={-1} disableRipple />
        </ListItemIcon>
        <ListItemText primary="Netflix" />
      </ListItemButton>
    </ListItem>
  );
};
