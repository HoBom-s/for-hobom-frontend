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
    <div>
      {groupedTodos.map((item) => (
        <List
          key={item.categoryId}
          sx={ListStyle}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              <Box display="flex" alignItems="center" gap={0.1}>
                {item.categoryTitle}
                <DailyTodoAddButton item={item} />
              </Box>
            </ListSubheader>
          }
        >
          {item.todoItems.map((todo) => renderItem(todo))}
        </List>
      ))}
    </div>
  );
};

const ListStyle = {
  width: "100%",
  maxWidth: 350,
  m: "0 auto",
};
