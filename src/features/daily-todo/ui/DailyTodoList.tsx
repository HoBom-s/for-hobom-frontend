import { List, ListSubheader } from "@mui/material";
import { DailyTodoListItem } from "@/features/daily-todo/ui/DailyTodoListItem.tsx";

export const DailyTodoList = () => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 350,
        height: "100%",
        maxHeight: 160,
        overflowY: "auto",
        m: "0 auto",
      }}
      subheader={<ListSubheader component="div">Category Title</ListSubheader>}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <DailyTodoListItem key={item} />
      ))}
    </List>
  );
};
