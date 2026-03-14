import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { InfiniteQueryObserver } from "./infinite-query-observer";
import { useDataLot } from "./use-data-lot";
import type { InfiniteQueryOptions } from "../core/types";
import type { UseInfiniteQueryResult } from "./types";

export function useInfiniteQuery<TData = unknown, TPageParam = unknown>(
  options: InfiniteQueryOptions<TData, TPageParam>,
): UseInfiniteQueryResult<TData, TPageParam> {
  const dataLot = useDataLot();

  const observerRef = useRef<InfiniteQueryObserver<TData, TPageParam> | null>(null);

  if (!observerRef.current) {
    observerRef.current = new InfiniteQueryObserver<TData, TPageParam>(dataLot, options);
  }

  const observer = observerRef.current;

  observer.setOptions(options);

  const queryKeyHash = hashKey(options.queryKey);

  useEffect(() => {
    observer.mount();

    return () => observer.unmount();
  }, [observer, queryKeyHash]);

  return useSyncExternalStore(
    (onStoreChange) => observer.subscribe(onStoreChange),
    () => observer.getResult(),
    () => observer.getResult(),
  );
}
