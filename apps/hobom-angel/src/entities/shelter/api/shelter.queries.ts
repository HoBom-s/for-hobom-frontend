import { queryOptions } from "hobom-data";
import {
  getShelterAnnouncements,
  getShelterBySlug,
  getShelterFaqs,
  getShelterStats,
} from "./shelter.api";

export const shelterQueries = {
  all: () => ["shelters"] as const,

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
} as const;
