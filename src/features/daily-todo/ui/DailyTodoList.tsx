import { type ReactNode, Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { ContentPasteTwoTone } from "@mui/icons-material";
import { useDailyTodoList } from "../model";
import { DailyTodoListContentSection } from "./DailyTodoListContentSection";

export const DailyTodoList = () => {
  const {
    todosWithNoCategory,
    todosWithCategory,
    groupedTodosWithCategory,
    shouldShowEmptyFallback,
  } = useDailyTodoList();

  if (shouldShowEmptyFallback) {
    return <DailyTodoList.Fallback />;
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DailyTodoListContentSection.WithCategory
        groupedTodos={groupedTodosWithCategory}
        todos={todosWithCategory}
      />
      <DailyTodoListContentSection.WithNoCategory todos={todosWithNoCategory} />
    </Box>
  );
};

DailyTodoList.Fallback = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={105}
    >
      <Box>
        <ContentPasteTwoTone fontSize="medium" />
      </Box>
      <Box>
        <Typography variant="caption">There is no todos..</Typography>
      </Box>
    </Box>
  );
};

DailyTodoList.WithSuspense = ({ children }: { children: ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};
