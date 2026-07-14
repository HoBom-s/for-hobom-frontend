import { infiniteQueryOptions } from "hobom-data";
import { searchAnimals } from "./animal.api";
import type { AnimalSearchParams } from "./animal.type";

/** Everything except the cursor — the cursor is managed by the infinite query. */
export type AnimalFilters = Omit<AnimalSearchParams, "cursor">;

export const animalQueries = {
  all: () => ["animals"] as const,

  list: (filters: AnimalFilters) =>
    infiniteQueryOptions({
      queryKey: [...animalQueries.all(), "list", filters] as const,
      queryFn: ({ pageParam, signal }) => searchAnimals({ ...filters, cursor: pageParam }, signal),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),
} as const;
