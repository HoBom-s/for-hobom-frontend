import { queryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchErrorEvents, fetchErrorEventById } from "./error-event.api";
import type { ErrorEventSearchParams } from "./error-event.type";

export const errorEventQueries = {
  all: () => ["error-events"],

  list: (params: ErrorEventSearchParams) =>
    queryOptions({
      queryKey: ["error-events", "list", params],
      queryFn: () => fetchErrorEvents(params),
      ...CACHE_PROFILE.FAST,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: ["error-events", "detail", id],
      queryFn: () => fetchErrorEventById(id),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
