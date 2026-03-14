import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { QueryObserver } from "./query-observer";
import { useDataLot } from "./use-data-lot";
import type { QueryKey } from "../core/types";
import type { UseSuspenseQueryOptions, UseSuspenseQueryResult } from "./types";

interface SuspenseQueriesOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queries: UseSuspenseQueryOptions<any, QueryKey>[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SuspenseQueriesResult = UseSuspenseQueryResult<any>[];

export function useSuspenseQueries(options: SuspenseQueriesOptions): SuspenseQueriesResult {
  const dataLot = useDataLot();

  const queriesHash = options.queries.map((q) => hashKey(q.queryKey)).join(",");

  const observersRef = useRef<QueryObserver[] | null>(null);
  const prevHashRef = useRef<string>("");
  const cachedResultsRef = useRef<SuspenseQueriesResult | null>(null);

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

  const buildResults = (): SuspenseQueriesResult =>
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

  return cachedResultsRef.current;
}
