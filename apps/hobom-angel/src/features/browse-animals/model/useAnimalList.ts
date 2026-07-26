import { useSuspenseInfiniteQuery } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import type { Animal, AnimalFilters } from "@/entities/animal";

/**
 * Suspense-backed animal list for the given filters (cursor pagination).
 * Loading suspends to the nearest boundary (skeleton); errors bubble to the
 * route ErrorBoundary — so this hook only ever deals with loaded data.
 */
export const useAnimalList = (filters: AnimalFilters) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    animalQueries.list(filters),
  );

  const animals: Animal[] = data.pages.flatMap((page) => page.animals);

  return { animals, fetchNextPage, hasNextPage, isFetchingNextPage };
};
