import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchLabels, fetchLabelById } from "./label.api";

export const labelQueries = {
  labels: () => ["labels"],

  list: () =>
    queryOptions({
      queryKey: ["labels", "list"],
      queryFn: ({ signal }) => fetchLabels(signal),
      ...CACHE_PROFILE.SLOW,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["labels", "detail", id],
      queryFn: ({ signal }) => fetchLabelById({ id }, signal),
      ...CACHE_PROFILE.SLOW,
    }),
} as const;
