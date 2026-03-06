import { queryOptions } from "@tanstack/react-query";
import { fetchProjectLabels } from "./project-label.api";

export const projectLabelQueries = {
  labels: () => ["project-labels"],

  listByProject: (projectId: string) =>
    queryOptions({
      queryKey: ["project-labels", "list", projectId],
      queryFn: () => fetchProjectLabels({ projectId }),
    }),
} as const;
