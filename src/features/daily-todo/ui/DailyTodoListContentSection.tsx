import { Fragment } from "react";
import { List, ListSubheader } from "@mui/material";
import { DailyTodoListItem, type DailyTodoType } from "@/entities/daily-todo";

const CategoryListSection = ({
  groupedTodos,
  todos,
}: {
  groupedTodos: Record<string, DailyTodoType[]>;
  todos: DailyTodoType[];
}) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {Object.entries(groupedTodos).map(([categoryId, items]) => {
        const categoryTitle =
          todos.find((item) => item.category.id === categoryId)?.category
            .title ?? "";

        return (
          <List
            key={categoryId}
            sx={ListStyle}
            subheader={
              <ListSubheader disableSticky disableGutters component="div">
                {categoryTitle}
              </ListSubheader>
            }
          >
            {items.map((item) => (
              <DailyTodoListItem key={item.id} item={item} />
            ))}
          </List>
        );
      })}
    </Fragment>
  );
};

const NoCategoryListSection = ({ todos }: { todos: DailyTodoType[] }) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <List
      sx={{
        ...ListStyle,
        mt: 1,
      }}
    >
      {todos.map((item) => (
        <DailyTodoListItem key={item.id} item={item} />
      ))}
    </List>
  );
};

export const DailyTodoListContentSection = {
  WithCategory: CategoryListSection,
  WithNoCategory: NoCategoryListSection,
};

const ListStyle = {
  width: "100%",
  maxWidth: 350,
  m: "0 auto",
  my: 1,
};
