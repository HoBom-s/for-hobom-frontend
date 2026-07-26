import { useInfiniteQuery } from "hobom-data";
import { volunteerPostQueries } from "@/entities/volunteer-post";

/** A post's comment thread (oldest first, infinite scroll). */
export const useComments = (postId: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    volunteerPostQueries.comments(postId),
  );
  const comments = (data?.pages ?? []).flatMap((page) => page.comments);

  return {
    comments,
    fetchNextPage: () => void fetchNextPage(),
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    loading: status === "pending",
  };
};
