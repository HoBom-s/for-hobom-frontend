import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { QueryObserver } from "./query-observer";
import { useDataLot } from "./use-data-lot";
import type { QueryKey } from "../core/types";
import type { UseSuspenseQueryOptions, UseSuspenseQueryResult } from "./types";

export function useSuspenseQuery<TData = unknown, TQueryKey extends QueryKey = QueryKey>(
  options: UseSuspenseQueryOptions<TData, TQueryKey>,
): UseSuspenseQueryResult<TData> {
  const dataLot = useDataLot();

  const observerRef = useRef<QueryObserver<TData> | null>(null);

  if (!observerRef.current) {
    observerRef.current = new QueryObserver<TData>(dataLot, {
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

  const result = useSyncExternalStore(
    (onStoreChange) => observer.subscribe(onStoreChange),
    () => observer.getResult(),
    () => observer.getResult(),
  );

  const state = observer.getQuery().getState();

  if (state.status === "pending") {
    throw observer.getQuery().fetch();
  }

  if (state.status === "error") {
    throw state.error;
  }

  return {
    data: result.data!,
    error: null,
    status: "success",
    fetchStatus: result.fetchStatus,
    isFetching: result.isFetching,
    refetch: result.refetch,
  };
}
