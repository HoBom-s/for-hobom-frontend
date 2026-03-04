import { type UIEvent, useCallback } from "react";

interface UseInfiniteScrollParams {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 200,
}: UseInfiniteScrollParams) =>
  useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (!hasNextPage || isFetchingNextPage) return;
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage, threshold],
  );
