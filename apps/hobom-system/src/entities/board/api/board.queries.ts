import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchBoardsByProject, fetchBoardById } from "./board.api";

export const boardQueries = {
  boards: () => ["boards"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["boards", "list", projectId],
      queryFn: ({ signal }) => fetchBoardsByProject({ projectId }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),

  detail: (projectId: string, boardId: string) =>
    queryOptions({
      queryKey: ["boards", "detail", projectId, boardId],
      queryFn: ({ signal }) => fetchBoardById({ projectId, boardId }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
