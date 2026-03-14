import { useEffect, useRef, useSyncExternalStore } from "react";
import { hashKey } from "../core/hash-key";
import { QueryObserver } from "./query-observer";
import { useDataLot } from "./use-data-lot";
import type { UseQueryOptions, UseQueryResult } from "./types";

interface UseQueriesOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queries: UseQueryOptions<any, any, any>[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQueriesResult = UseQueryResult<any, any>[];

export function useQueries(options: UseQueriesOptions): UseQueriesResult {
  const dataLot = useDataLot();

  const queriesHash = options.queries.map((q) => hashKey(q.queryKey)).join(",");

  const observersRef = useRef<QueryObserver[] | null>(null);
  const prevHashRef = useRef<string>("");
  const cachedResultsRef = useRef<UseQueriesResult | null>(null);

  if (!observersRef.current || prevHashRef.current !== queriesHash) {
    observersRef.current = options.queries.map(
      (queryOpts) => new QueryObserver(dataLot, queryOpts),
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

  const buildResults = (): UseQueriesResult => observers.map((observer) => observer.getResult());

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

  return cachedResultsRef.current;
}
