import { infiniteQueryOptions } from "hobom-data";
import { getComments } from "./comment.api";
import { getMyBookmarks, getVolunteerFeed } from "./volunteer-post.api";

const PAGE_SIZE = 20;

export const volunteerPostQueries = {
  all: () => ["volunteer-posts"] as const,

  feed: () =>
    infiniteQueryOptions({
      queryKey: [...volunteerPostQueries.all(), "feed"] as const,
      queryFn: ({ pageParam, signal }) => getVolunteerFeed(pageParam, PAGE_SIZE, signal),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),

  myBookmarks: () =>
    infiniteQueryOptions({
      queryKey: [...volunteerPostQueries.all(), "bookmarks"] as const,
      queryFn: ({ pageParam, signal }) => getMyBookmarks(pageParam, PAGE_SIZE, signal),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),

  comments: (postId: string) =>
    infiniteQueryOptions({
      queryKey: [...volunteerPostQueries.all(), "comments", postId] as const,
      queryFn: ({ pageParam, signal }) => getComments(postId, pageParam, signal),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),
} as const;
