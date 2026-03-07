import { queryOptions } from "@tanstack/react-query";
import { fetchBoardsByProject, fetchBoardById } from "./board.api";

export const boardQueries = {
  boards: () => ["boards"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["boards", "list", projectId],
      queryFn: () => fetchBoardsByProject({ projectId }),
    }),

  detail: (projectId: string, boardId: string) =>
    queryOptions({
      queryKey: ["boards", "detail", projectId, boardId],
      queryFn: () => fetchBoardById({ projectId, boardId }),
    }),
} as const;
