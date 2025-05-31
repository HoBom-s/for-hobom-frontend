import { MoreVert } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { DailyTodoType } from "@/features/daily-todo/api";
import { DailyTodoCompleteStatusModel } from "@/features/daily-todo/model";

interface Props {
  item: DailyTodoType;
}

export const DailyTodoListItem = ({ item }: Props) => {
  return (
    <ListItem
      sx={{ height: 40 }}
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <MoreVert />
        </IconButton>
      }
    >
      <ListItemButton dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            checked={item.progress === DailyTodoCompleteStatusModel.COMPLETED}
          />
        </ListItemIcon>
        <ListItemText primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};
