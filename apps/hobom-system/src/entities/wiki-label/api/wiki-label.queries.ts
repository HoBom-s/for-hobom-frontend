import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchLabels, fetchPagesByLabel } from "./wiki-label.api";

export const wikiLabelQueries = {
  labels: () => ["wiki-labels"],

  list: (spaceKey: string) =>
    queryOptions({
      queryKey: ["wiki-labels", "list", spaceKey] as const,
      queryFn: () => fetchLabels({ spaceKey }),
      ...CACHE_PROFILE.SLOW,
    }),

  pagesByLabel: (spaceKey: string, labelId: string) =>
    queryOptions({
      queryKey: ["wiki-labels", "pages", spaceKey, labelId] as const,
      queryFn: () => fetchPagesByLabel({ spaceKey, labelId }),
    }),
} as const;
