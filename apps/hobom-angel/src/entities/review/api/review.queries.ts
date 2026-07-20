import { infiniteQueryOptions, queryOptions } from "hobom-data";
import { getShelterReputation, getShelterReviews } from "./review.api";

export const reviewQueries = {
  all: () => ["reviews"] as const,

  reputation: (shelterId: string) =>
    queryOptions({
      queryKey: [...reviewQueries.all(), shelterId, "reputation"] as const,
      queryFn: ({ signal }) => getShelterReputation(shelterId, signal),
    }),

  list: (shelterId: string) =>
    infiniteQueryOptions({
      queryKey: [...reviewQueries.all(), shelterId, "list"] as const,
      queryFn: ({ pageParam, signal }) => getShelterReviews(shelterId, pageParam, signal),
      getNextPageParam: (last) => (last.hasNext ? (last.nextCursor ?? undefined) : undefined),
      initialPageParam: undefined as string | undefined,
    }),
} as const;
