import { mutationOptions } from "@tanstack/react-query";
import { postCategory, patchCategory, deleteCategory } from "./daily-todo-category.api";

export const categoryMutations = {
  categories: () => ["categories"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...categoryMutations.categories(), "create"] as const,
      mutationFn: postCategory,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...categoryMutations.categories(), "update"] as const,
      mutationFn: patchCategory,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...categoryMutations.categories(), "delete"] as const,
      mutationFn: deleteCategory,
    }),
} as const;
