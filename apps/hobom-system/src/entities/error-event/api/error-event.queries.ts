import { HoBom } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchErrorEvents, fetchErrorEventById } from "./error-event.api";
import type { ErrorEventSearchParams } from "./error-event.type";

export const errorEventQueries = {
  all: () => ["error-events"],

  list: (params: ErrorEventSearchParams) =>
    HoBom.DataLot.queryOptions({
      queryKey: ["error-events", "list", params],
      queryFn: ({ signal }) => fetchErrorEvents(params, signal),
      ...CACHE_PROFILE.FAST,
    }),

  detail: (id: number) =>
    HoBom.DataLot.queryOptions({
      queryKey: ["error-events", "detail", id],
      queryFn: ({ signal }) => fetchErrorEventById(id, signal),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
