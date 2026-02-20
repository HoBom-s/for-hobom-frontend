import { type ReactNode } from "react";
import { Box, List, ListSubheader } from "@mui/material";
import {
  DailyTodoAddButton,
  type DailyTodoType,
  type DailyTodoWithCategoryType,
} from "@/entities/daily-todo";

interface Props {
  groupedTodos: DailyTodoWithCategoryType[];
  renderItem: (render: DailyTodoType) => ReactNode;
}

export const DailyTodoListContentSection = ({
  groupedTodos,
  renderItem,
}: Props) => {
  return (
    <Box sx={{ width: "100%", py: 1 }}>
      {groupedTodos.map((item) => (
        <List
          key={item.categoryId}
          disablePadding
          sx={{ width: "100%", mb: 1 }}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              component="div"
              sx={{
                px: 2.5,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "text.secondary",
                bgcolor: "transparent",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              {item.categoryTitle}
              <DailyTodoAddButton item={item} />
            </ListSubheader>
          }
        >
          {item.todoItems.map((todo) => renderItem(todo))}
        </List>
      ))}
    </Box>
  );
};
