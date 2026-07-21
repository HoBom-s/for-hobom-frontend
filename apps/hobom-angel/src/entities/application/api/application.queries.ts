import { infiniteQueryOptions, queryOptions } from "hobom-data";
import {
  getApplicationDetail,
  getMyApplications,
  getShelterApplications,
} from "./application.api";
import type { ApplicationKind, ApplicationStatus } from "../model/application.model";

export const applicationQueries = {
  all: () => ["applications"] as const,

  mine: (kind: ApplicationKind, status?: ApplicationStatus) =>
    queryOptions({
      queryKey: [...applicationQueries.all(), "mine", kind, status ?? "ALL"] as const,
      queryFn: ({ signal }) => getMyApplications(kind, status, undefined, signal),
    }),

  queue: (shelterId: string, kind: ApplicationKind, status?: ApplicationStatus) =>
    infiniteQueryOptions({
      queryKey: [...applicationQueries.all(), shelterId, kind, status ?? "ALL"] as const,
      queryFn: ({ pageParam, signal }) =>
        getShelterApplications(shelterId, kind, status, pageParam, signal),
      getNextPageParam: (last) => (last.hasNext ? (last.nextCursor ?? undefined) : undefined),
      initialPageParam: undefined as string | undefined,
    }),

  detail: (kind: ApplicationKind, id: string) =>
    queryOptions({
      queryKey: [...applicationQueries.all(), "detail", kind, id] as const,
      queryFn: ({ signal }) => getApplicationDetail(kind, id, signal),
    }),
} as const;
