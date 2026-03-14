import { queryOptions } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchDlqKeys, fetchDlqDetail } from "./dlq.api";

export const dlqQueries = {
  all: () => ["dlq"],

  list: () =>
    queryOptions({
      queryKey: ["dlq", "list"],
      queryFn: () => fetchDlqKeys(),
      ...CACHE_PROFILE.FAST,
    }),

  detail: (key: string) =>
    queryOptions({
      queryKey: ["dlq", "detail", key],
      queryFn: () => fetchDlqDetail(key),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
