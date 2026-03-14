import { HoBom } from "hobom-data";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchErrorEvents, fetchErrorEventById } from "./error-event.api";
import type { ErrorEventSearchParams } from "./error-event.type";

export const errorEventQueries = {
  all: () => ["error-events"],

  list: (params: ErrorEventSearchParams) =>
    HoBom.DataLot.queryOptions({
      queryKey: ["error-events", "list", params],
      queryFn: () => fetchErrorEvents(params),
      ...CACHE_PROFILE.FAST,
    }),

  detail: (id: number) =>
    HoBom.DataLot.queryOptions({
      queryKey: ["error-events", "detail", id],
      queryFn: () => fetchErrorEventById(id),
      ...CACHE_PROFILE.MODERATE,
    }),
} as const;
