import { infiniteQueryOptions } from "@tanstack/react-query";
import { CACHE_PROFILE } from "@/shared/config";
import { fetchComments } from "./wiki-comment.api";

const COMMENTS_PAGE_SIZE = 10;

export const wikiCommentQueries = {
  comments: () => ["wiki-comments"],

  list: (spaceKey: string, pageId: string) =>
    infiniteQueryOptions({
      queryKey: ["wiki-comments", "list", spaceKey, pageId] as const,
      ...CACHE_PROFILE.FAST,
      queryFn: ({ pageParam }) =>
        fetchComments({
          spaceKey,
          pageId,
          offset: pageParam,
          limit: COMMENTS_PAGE_SIZE,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { offset, items, totalCount } = lastPage.items;
        const nextOffset = offset + items.length;
        return nextOffset < totalCount ? nextOffset : undefined;
      },
    }),
} as const;
