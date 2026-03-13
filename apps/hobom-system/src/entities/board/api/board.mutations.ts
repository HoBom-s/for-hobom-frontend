import { mutationOptions } from "@tanstack/react-query";
import { postCreateBoard, patchUpdateBoard, deleteBoard } from "./board.api";

export const boardMutations = {
  boards: () => ["boards"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...boardMutations.boards(), "create"] as const,
      mutationFn: postCreateBoard,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...boardMutations.boards(), "update"] as const,
      mutationFn: patchUpdateBoard,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...boardMutations.boards(), "delete"] as const,
      mutationFn: deleteBoard,
    }),
} as const;
