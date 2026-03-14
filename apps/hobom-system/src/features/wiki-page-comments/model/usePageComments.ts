import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { wikiCommentQueries } from "@/entities/wiki-comment";
import { buildCommentTree } from "../lib/build-comment-tree.lib";

export const usePageComments = (spaceKey: string, pageId: string) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    wikiCommentQueries.list(spaceKey, pageId),
  );

  const allComments = data.pages.flatMap((page) => page.items.items);
  const totalCount = data.pages.at(-1)?.items.totalCount ?? 0;
  const tree = buildCommentTree(allComments);

  return {
    comments: tree,
    totalCount,
    loadedCount: allComments.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
