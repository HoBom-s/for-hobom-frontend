import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchDlqKeys, fetchDlqDetail } from "./dlq.api";

export const dlqQueries = {
  all: () => ["dlq"],

  list: () =>
    queryOptions({
      queryKey: ["dlq", "list"],
      queryFn: ({ signal }) => fetchDlqKeys(signal),
      ...CACHE_PROFILE.FAST,
    }),

  detail: (key: string) =>
    queryOptions({
      queryKey: ["dlq", "detail", key],
      queryFn: ({ signal }) => fetchDlqDetail(key, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
