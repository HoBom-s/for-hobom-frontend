import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchLabels, fetchLabelById } from "./label.api";

export const labelQueries = {
  labels: () => ["labels"],

  list: () =>
    queryOptions({
      queryKey: ["labels", "list"],
      queryFn: fetchLabels,
      ...CACHE_PROFILE.SLOW,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["labels", "detail", id],
      queryFn: () => fetchLabelById({ id }),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
