import { queryOptions } from "@tanstack/react-query";
import { fetchSprintsByProject } from "./sprint.api";

export const sprintQueries = {
  sprints: () => ["sprints"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["sprints", "list", projectId],
      queryFn: () => fetchSprintsByProject({ projectId }),
    }),
} as const;
