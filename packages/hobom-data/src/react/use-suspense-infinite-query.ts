import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { InfiniteQueryObserver } from "./infinite-query-observer";
import { useDataLot } from "./use-data-lot";
import type { InfiniteData, InfiniteQueryOptions } from "../core/types";
import type { UseSuspenseInfiniteQueryResult } from "./types";

export function useSuspenseInfiniteQuery<TData = unknown, TPageParam = unknown>(
  options: Omit<InfiniteQueryOptions<TData, TPageParam>, "enabled">,
): UseSuspenseInfiniteQueryResult<TData, TPageParam> {
  const dataLot = useDataLot();

  const observerRef = useRef<InfiniteQueryObserver<TData, TPageParam> | null>(null);

  if (!observerRef.current) {
    observerRef.current = new InfiniteQueryObserver<TData, TPageParam>(dataLot, {
      ...options,
      enabled: true,
    });
  }

  const observer = observerRef.current;

  observer.setOptions({ ...options, enabled: true });

  const queryKeyHash = hashKey(options.queryKey);

  useEffect(() => {
    observer.mount();

    return () => observer.unmount();
  }, [observer, queryKeyHash]);

  useSyncExternalStore(
    (onStoreChange) => observer.subscribe(onStoreChange),
    () => observer.getResult(),
    () => observer.getResult(),
  );

  const query = observer.getQuery();
  const state = query.getState();

  if (state.status === "pending") {
    throw query.fetch();
  }

  if (state.status === "error") {
    throw state.error;
  }

  const data = state.data as InfiniteData<TData, TPageParam>;
  const lastPage = data.pages[data.pages.length - 1];
  const hasNextPage =
    lastPage !== undefined ? options.getNextPageParam(lastPage, data.pages) !== undefined : false;

  return {
    data,
    error: null,
    status: "success",
    fetchStatus: state.fetchStatus,
    isFetching: state.fetchStatus === "fetching",
    hasNextPage,
    isFetchingNextPage: false,
    fetchNextPage: () => observer.fetchNextPage(),
    refetch: () => query.fetch(),
  };
}
