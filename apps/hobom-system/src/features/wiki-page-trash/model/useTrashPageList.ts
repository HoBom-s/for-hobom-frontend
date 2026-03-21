import { useSuspenseInfiniteQuery } from "hobom-data";
import { wikiPageQueries, useRestoreTrashPage, usePermanentDeletePage } from "@/entities/wiki-page";

export const useTrashPageList = ({ spaceKey }: { spaceKey: string }) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    wikiPageQueries.trash(spaceKey),
  );

  const pages = data.pages.flatMap((page) => page.items.items);
  const totalCount = data.pages.at(-1)?.items.totalCount ?? 0;

  const restorePage = useRestoreTrashPage();
  const permanentDelete = usePermanentDeletePage();

  const handleRestore = (pageId: string) => {
    restorePage.mutate({ spaceKey, pageId });
  };

  const handlePermanentDelete = (pageId: string, onSuccess?: () => void) => {
    permanentDelete.mutate({ spaceKey, pageId }, { onSuccess });
  };

  return {
    pages,
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    handleRestore,
    handlePermanentDelete,
    isRestoring: restorePage.isPending,
    isDeleting: permanentDelete.isPending,
  };
};
