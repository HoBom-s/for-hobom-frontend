import { useSuspenseInfiniteQuery } from "hobom-data";
import { reviewQueries } from "@/entities/review";
import type { Review } from "@/entities/review";

/** Suspense-backed, cursor-paginated reviews for a shelter. */
export const useShelterReviews = (shelterId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    reviewQueries.list(shelterId),
  );

  const reviews: Review[] = data.pages.flatMap((page) => page.reviews);

  return { reviews, fetchNextPage, hasNextPage, isFetchingNextPage };
};
