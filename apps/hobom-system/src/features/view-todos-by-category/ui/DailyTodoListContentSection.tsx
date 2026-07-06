import { type ReactNode, useState } from "react";
import { Add, CheckCircleOutline } from "hobom-design-system/icons";
import {
  isCompleteStatus,
  type DailyTodoType,
  type DailyTodoWithCategoryType,
} from "@/entities/daily-todo";
import { DailyTodoAddButton } from "@/entities/daily-todo/ui";
import { Hb } from "@/shared/ui";
import { CategoryCreateDialog } from "./CategoryCreateDialog";
import { CategoryMenu } from "./CategoryMenu";

interface Props {
  groupedTodos: DailyTodoWithCategoryType[];
  renderItem: (render: DailyTodoType) => ReactNode;
}

const CategoryProgress = ({ items }: { items: DailyTodoType[] }) => {
  if (items.length === 0) return null;
  const done = items.filter((t) => isCompleteStatus(t.progress)).length;
  const total = items.length;

  return (
    <Hb.Chip
      size="small"
      label={`${done}/${total}`}
      style={{
        height: 20,
        fontSize: "0.6875rem",
        fontWeight: 500,
        backgroundColor: done === total ? "success.main" : "action.selected",
        color: done === total ? "success.contrastText" : "text.secondary",
      }}
    />
  );
};

export const DailyTodoListContentSection = ({ groupedTodos, renderItem }: Props) => {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      {groupedTodos.length === 0 ? (
        <Hb.Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            gap: 1.5,
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 64, color: "#dadce0" }} />
          <Hb.Text
            variant="body1"
            style={{
              color: "var(--hb-color-text-disabled)",
              fontSize: "0.95rem",
            }}
          >
            오늘의 할 일이 없어요
          </Hb.Text>
        </Hb.Box>
      ) : (
        <Hb.Box sx={{ width: "100%", py: 1 }}>
          {groupedTodos.map((item) => (
            <Hb.List.Root
              key={item.categoryId}
              disablePadding
              sx={{ width: "100%", mb: 1 }}
              subheader={
                <Hb.List.Subheader
                  disableSticky
                  disableGutters
                  component="div"
                  sx={{
                    px: 2.5,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "text.secondary",
                    bgcolor: "transparent",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  {item.categoryTitle}
                  <CategoryProgress items={item.todoItems} />
                  <CategoryMenu categoryId={item.categoryId} categoryTitle={item.categoryTitle} />
                  <Hb.Box sx={{ ml: "auto" }}>
                    <DailyTodoAddButton item={item} />
                  </Hb.Box>
                </Hb.List.Subheader>
              }
            >
              {item.todoItems.map((todo) => renderItem(todo))}
            </Hb.List.Root>
          ))}
        </Hb.Box>
      )}
      <Hb.Box sx={{ px: 2.5, py: 1.5 }}>
        <Hb.Button
          size="small"
          startIcon={<Add />}
          sx={{ color: "text.secondary", textTransform: "none" }}
          onClick={() => setCreateOpen(true)}
        >
          카테고리 추가
        </Hb.Button>
      </Hb.Box>
      <CategoryCreateDialog open={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
};
