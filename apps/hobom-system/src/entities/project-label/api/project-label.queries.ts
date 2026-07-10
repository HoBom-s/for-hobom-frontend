import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchProjectLabels } from "./project-label.api";

export const projectLabelQueries = {
  labels: () => ["project-labels"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["project-labels", "list", projectId],
      queryFn: ({ signal }) => fetchProjectLabels({ projectId }, signal),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
