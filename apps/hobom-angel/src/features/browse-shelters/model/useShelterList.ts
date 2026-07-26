import { useSuspenseInfiniteQuery } from "hobom-data";
import { shelterQueries } from "@/entities/shelter";
import type { ShelterListItem } from "@/entities/shelter";

/**
 * Suspense-backed shelter directory for the given region (cursor pagination).
 * Loading suspends to the nearest boundary (skeleton); errors bubble to the
 * route ErrorBoundary — so this hook only ever deals with loaded data.
 */
export const useShelterList = (region?: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    shelterQueries.list(region),
  );

  const shelters: ShelterListItem[] = data.pages.flatMap((page) => page.shelters);

  return { shelters, fetchNextPage, hasNextPage, isFetchingNextPage };
};
