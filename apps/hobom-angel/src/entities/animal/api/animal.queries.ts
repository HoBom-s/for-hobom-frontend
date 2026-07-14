import { infiniteQueryOptions, queryOptions } from "hobom-data";
import { getAnimal, searchAnimals } from "./animal.api";
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

  detail: (id: string) =>
    queryOptions({
      queryKey: [...animalQueries.all(), "detail", id] as const,
      queryFn: ({ signal }) => getAnimal(id, signal),
    }),
} as const;
