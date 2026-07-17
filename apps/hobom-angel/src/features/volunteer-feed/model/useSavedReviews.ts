import { useSuspenseInfiniteQuery } from "hobom-data";
import { volunteerPostQueries } from "@/entities/volunteer-post";
import type { VolunteerPost } from "@/entities/volunteer-post";

/** The viewer's saved (bookmarked) reviews, suspense-backed with cursor
 *  pagination. */
export const useSavedReviews = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    volunteerPostQueries.myBookmarks(),
  );
  const posts: VolunteerPost[] = data.pages.flatMap((page) => page.posts);

  return {
    posts,
    fetchNextPage: () => void fetchNextPage(),
    hasNextPage,
    isFetchingNextPage,
  };
};
