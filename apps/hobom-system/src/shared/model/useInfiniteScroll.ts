import { type UIEvent, useCallback } from "react";

interface UseInfiniteScrollParams {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

/**
 * React Query `useInfiniteQuery`와 연동하는 무한 스크롤 훅.
 * 반환된 `onScroll` 핸들러를 스크롤 컨테이너에 연결하면,
 * 스크롤이 하단 `threshold`(기본 200px) 이내에 도달했을 때 `fetchNextPage`를 호출한다.
 */
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
