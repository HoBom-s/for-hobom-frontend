import { describe, it, expect } from "vitest";
import type { CategoryType, DailyTodoType } from "@/entities/daily-todo";
import { createTodosWithCategory } from "./create-todo-with-category.model";

const makeCategory = (overrides: Partial<CategoryType> = {}): CategoryType => ({
  id: "cat-1",
  title: "카테고리1",
  ownerId: "user-1",
  ...overrides,
});

const makeTodo = (overrides: Partial<DailyTodoType> = {}): DailyTodoType => ({
  id: "todo-1",
  title: "할일1",
  date: "2026-01-01",
  reaction: null,
  progress: "PROGRESS",
  cycle: "EVERYDAY",
  owner: { id: "user-1", username: "user", nickname: "유저" },
  category: { id: "cat-1", title: "카테고리1", ownerId: "user-1" },
  ...overrides,
});

describe("createTodosWithCategory", () => {
  it("단일 카테고리에 매칭되는 할일을 올바르게 분류한다", () => {
    const category = makeCategory();
    const todos = [makeTodo({ id: "todo-1" }), makeTodo({ id: "todo-2" })];

    const result = createTodosWithCategory([category], todos);

    expect(result).toHaveLength(1);
    expect(result[0]?.categoryId).toBe("cat-1");
    expect(result[0]?.todoItems).toHaveLength(2);
  });

  it("여러 카테고리에 각각 올바른 할일을 분류한다", () => {
    const cat1 = makeCategory({ id: "cat-1", title: "카테고리1" });
    const cat2 = makeCategory({ id: "cat-2", title: "카테고리2" });

    const todos = [
      makeTodo({
        id: "todo-1",
        category: { id: "cat-1", title: "카테고리1", ownerId: "user-1" },
      }),
      makeTodo({
        id: "todo-2",
        category: { id: "cat-2", title: "카테고리2", ownerId: "user-1" },
      }),
      makeTodo({
        id: "todo-3",
        category: { id: "cat-1", title: "카테고리1", ownerId: "user-1" },
      }),
    ];

    const result = createTodosWithCategory([cat1, cat2], todos);

    expect(result).toHaveLength(2);
    expect(result[0]?.categoryId).toBe("cat-1");
    expect(result[0]?.todoItems).toHaveLength(2);
    expect(result[1]?.categoryId).toBe("cat-2");
    expect(result[1]?.todoItems).toHaveLength(1);
  });

  it("매칭되는 할일이 없으면 todoItems가 빈 배열이다", () => {
    const category = makeCategory({ id: "cat-99" });
    const todos = [makeTodo()];

    const result = createTodosWithCategory([category], todos);

    expect(result).toHaveLength(1);
    expect(result[0]?.todoItems).toHaveLength(0);
  });

  it("할일 배열이 비어있으면 모든 카테고리의 todoItems가 빈 배열이다", () => {
    const categories = [makeCategory({ id: "cat-1" }), makeCategory({ id: "cat-2" })];

    const result = createTodosWithCategory(categories, []);

    expect(result).toHaveLength(2);
    expect(result[0]?.todoItems).toHaveLength(0);
    expect(result[1]?.todoItems).toHaveLength(0);
  });
});
