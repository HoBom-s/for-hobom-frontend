import { useState } from "react";
import { useSuspenseInfiniteQuery } from "hobom-data";
import { wikiPageQueries, useRestorePageVersion, type PageVersionType } from "@/entities/wiki-page";

export const useVersionHistory = ({
  spaceKey,
  pageId,
  onClose,
}: {
  spaceKey: string;
  pageId: string;
  onClose: () => void;
}) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    wikiPageQueries.versions(spaceKey, pageId),
  );

  const versions = data.pages.flatMap((page) => page.items.items);
  const totalCount = data.pages.at(-1)?.items.totalCount ?? 0;

  const [selectedVersion, setSelectedVersion] = useState<PageVersionType | null>(null);
  const restoreVersion = useRestorePageVersion();

  const handleRestore = (version: number) => {
    restoreVersion.mutate({ spaceKey, pageId, version }, { onSuccess: () => onClose() });
  };

  return {
    versions,
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    selectedVersion,
    setSelectedVersion,
    handleRestore,
    isRestoring: restoreVersion.isPending,
  };
};
