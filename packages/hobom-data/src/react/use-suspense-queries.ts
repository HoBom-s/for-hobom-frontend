import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { QueryObserver } from "./query-observer";
import { useDataLot } from "./use-data-lot";
import type { UseSuspenseQueryOptions, UseSuspenseQueryResult } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferQueryData<T> = T extends { queryFn: (...args: any[]) => Promise<infer TData> }
  ? TData
  : unknown;

type MapSuspenseResults<T extends readonly unknown[]> = {
  [K in keyof T]: UseSuspenseQueryResult<InferQueryData<T[K]>>;
};

export function useSuspenseQueries<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T extends readonly UseSuspenseQueryOptions<any, any>[],
>(options: { queries: [...T] }): MapSuspenseResults<T> {
  const dataLot = useDataLot();

  const queriesHash = options.queries.map((q) => hashKey(q.queryKey)).join(",");

  const observersRef = useRef<QueryObserver[] | null>(null);
  const prevHashRef = useRef<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cachedResultsRef = useRef<UseSuspenseQueryResult<any>[] | null>(null);

  if (!observersRef.current || prevHashRef.current !== queriesHash) {
    observersRef.current = options.queries.map(
      (queryOpts) => new QueryObserver(dataLot, { ...queryOpts, enabled: true }),
    );
    prevHashRef.current = queriesHash;
    cachedResultsRef.current = null;
  }

  const observers = observersRef.current;

  useEffect(() => {
    for (const observer of observers) {
      observer.mount();
    }

    return () => {
      for (const observer of observers) {
        observer.unmount();
      }
    };
  }, [observers]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buildResults = (): UseSuspenseQueryResult<any>[] =>
    observers.map((observer) => {
      const result = observer.getResult();

      return {
        data: result.data,
        error: null,
        status: "success" as const,
        fetchStatus: result.fetchStatus,
        isFetching: result.isFetching,
        refetch: result.refetch,
      };
    });

  const subscribeAll = (onStoreChange: () => void) => {
    const unsubscribes = observers.map((obs) =>
      obs.subscribe(() => {
        cachedResultsRef.current = buildResults();
        onStoreChange();
      }),
    );

    return () => {
      for (const unsub of unsubscribes) {
        unsub();
      }
    };
  };

  if (!cachedResultsRef.current) {
    cachedResultsRef.current = buildResults();
  }

  const getSnapshot = () => cachedResultsRef.current!;

  useSyncExternalStore(subscribeAll, getSnapshot, getSnapshot);

  // All hooks called — now throw for Suspense if needed
  const pendingPromises: Promise<unknown>[] = [];
  const errors: unknown[] = [];

  for (const observer of observers) {
    const state = observer.getQuery().getState();

    if (state.status === "pending") {
      pendingPromises.push(observer.getQuery().fetch());
    } else if (state.status === "error") {
      errors.push(state.error);
    }
  }

  if (pendingPromises.length > 0) {
    throw Promise.all(pendingPromises);
  }

  if (errors.length > 0) {
    throw errors[0];
  }

  // Read directly from query state — observer's cached result may be stale
  // after Suspense throw (mount/useEffect never ran, so no subscription update).
  return observers.map((observer) => {
    const state = observer.getQuery().getState();

    return {
      data: state.data,
      error: null,
      status: "success" as const,
      fetchStatus: state.fetchStatus,
      isFetching: state.fetchStatus === "fetching",
      refetch: () => observer.getQuery().fetch(),
    };
  }) as MapSuspenseResults<T>;
}
