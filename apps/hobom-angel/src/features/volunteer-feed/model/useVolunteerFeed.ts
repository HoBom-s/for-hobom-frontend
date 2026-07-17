import { useSuspenseInfiniteQuery } from "hobom-data";
import { volunteerPostQueries } from "@/entities/volunteer-post";
import type { VolunteerPost } from "@/entities/volunteer-post";

/** The review feed, suspense-backed with cursor pagination (§05 봉사 후기). */
export const useVolunteerFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    volunteerPostQueries.feed(),
  );
  const posts: VolunteerPost[] = data.pages.flatMap((page) => page.posts);

  return {
    posts,
    fetchNextPage: () => void fetchNextPage(),
    hasNextPage,
    isFetchingNextPage,
  };
};
