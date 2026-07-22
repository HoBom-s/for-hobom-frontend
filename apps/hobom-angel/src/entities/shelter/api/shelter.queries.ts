import { infiniteQueryOptions, queryOptions } from "hobom-data";
import {
  getShelterAnnouncements,
  getShelterBySlug,
  getShelterDashboard,
  getShelterFaqs,
  getShelterMarkers,
  getShelterStaff,
  getShelterStats,
  searchShelters,
} from "./shelter.api";

export const shelterQueries = {
  all: () => ["shelters"] as const,

  list: (region?: string) =>
    infiniteQueryOptions({
      queryKey: [...shelterQueries.all(), "list", region ?? null] as const,
      queryFn: ({ pageParam, signal }) => searchShelters({ region, cursor: pageParam }, signal),
      getNextPageParam: (last) => (last.hasNext ? (last.nextCursor ?? undefined) : undefined),
      initialPageParam: undefined as string | undefined,
    }),

  markers: (region?: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), "markers", region ?? null] as const,
      queryFn: ({ signal }) => getShelterMarkers(region, signal),
    }),

  detail: (slug: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), "detail", slug] as const,
      queryFn: ({ signal }) => getShelterBySlug(slug, signal),
    }),

  announcements: (shelterId: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), shelterId, "announcements"] as const,
      queryFn: ({ signal }) => getShelterAnnouncements(shelterId, signal),
    }),

  faqs: (shelterId: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), shelterId, "faqs"] as const,
      queryFn: ({ signal }) => getShelterFaqs(shelterId, signal),
    }),

  stats: (shelterId: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), shelterId, "stats"] as const,
      queryFn: ({ signal }) => getShelterStats(shelterId, signal),
    }),

  dashboard: (shelterId: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), shelterId, "dashboard"] as const,
      queryFn: ({ signal }) => getShelterDashboard(shelterId, signal),
    }),

  staff: (shelterId: string) =>
    queryOptions({
      queryKey: [...shelterQueries.all(), shelterId, "staff"] as const,
      queryFn: ({ signal }) => getShelterStaff(shelterId, signal),
    }),
} as const;
