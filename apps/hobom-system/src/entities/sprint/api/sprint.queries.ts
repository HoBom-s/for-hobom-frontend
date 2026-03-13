import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchSprintsByProject } from "./sprint.api";

export const sprintQueries = {
  sprints: () => ["sprints"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["sprints", "list", projectId],
      queryFn: () => fetchSprintsByProject({ projectId }),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
