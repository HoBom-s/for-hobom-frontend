import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { QueryObserver } from "./query-observer";
import { useDataLot } from "./use-data-lot";
import type { QueryKey } from "../core/types";
import type { UseQueryOptions, UseQueryResult } from "./types";

export function useQuery<TData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  options: UseQueryOptions<TData, TError, TQueryKey>,
): UseQueryResult<TData, TError> {
  const dataLot = useDataLot();

  const observerRef = useRef<QueryObserver<TData> | null>(null);

  if (!observerRef.current) {
    observerRef.current = new QueryObserver<TData>(dataLot, options);
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
  ) as UseQueryResult<TData, TError>;
}
