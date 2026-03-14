import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchBoardsByProject, fetchBoardById } from "./board.api";

export const boardQueries = {
  boards: () => ["boards"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["boards", "list", projectId],
      queryFn: () => fetchBoardsByProject({ projectId }),
      ...CACHE_PROFILE.MODERATE,
    }),

  detail: (projectId: string, boardId: string) =>
    queryOptions({
      queryKey: ["boards", "detail", projectId, boardId],
      queryFn: () => fetchBoardById({ projectId, boardId }),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
