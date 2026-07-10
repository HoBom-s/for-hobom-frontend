import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchSprintsByProject } from "./sprint.api";

export const sprintQueries = {
  sprints: () => ["sprints"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["sprints", "list", projectId],
      queryFn: ({ signal }) => fetchSprintsByProject({ projectId }, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
