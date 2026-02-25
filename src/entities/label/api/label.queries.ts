import { queryOptions } from "@tanstack/react-query";
import { fetchLabels, fetchLabelById } from "./label.api";

export const labelQueries = {
  labels: () => ["labels"],

  list: () =>
    queryOptions({
      queryKey: ["labels", "list"],
      queryFn: fetchLabels,
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ["labels", "detail", id],
      queryFn: () => fetchLabelById({ id }),
    }),
} as const;
