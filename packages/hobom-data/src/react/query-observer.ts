import { hashKey } from "../core/hash-key";
import { Subscribable } from "../core/subscribable";
import type { DataLot } from "../core/data-lot";
import type { Query } from "../core/query";
import type { QueryKey, QueryOptions } from "../core/types";
import type { UseQueryResult } from "./types";

export class QueryObserver<TData = unknown> extends Subscribable {
  private options: QueryOptions<TData> & {
    enabled?: boolean;
    select?: (data: TData) => TData;
  };
  private dataLot: DataLot;
  private query: Query<TData>;
  private result: UseQueryResult<TData>;
  private unsubscribeQuery: (() => void) | null = null;
  private mountedQuery: Query<TData> | null = null;

  constructor(
    dataLot: DataLot,
    options: QueryOptions<TData> & {
      enabled?: boolean;
      select?: (data: TData) => TData;
    },
  ) {
    super();
    this.dataLot = dataLot;
    this.options = options;
    this.query = this.resolveQuery(options);
    this.result = this.buildResult();
  }

  /**
   * Render-safe: updates options/query ref and cached result only.
   * No side effects — subscriptions are handled by mount/unmount.
   */
  setOptions(
    options: QueryOptions<TData> & {
      enabled?: boolean;
      select?: (data: TData) => TData;
    },
  ): void {
    const prevHash = hashKey(this.options.queryKey);
    const nextHash = hashKey(options.queryKey);

    this.options = options;

    if (prevHash !== nextHash) {
      this.query = this.resolveQuery(options);
      this.result = this.buildResult();
    }
  }

  getResult(): UseQueryResult<TData> {
    return this.result;
  }

  getQuery(): Query<TData> {
    return this.query;
  }

  getQueryKey(): QueryKey {
    return this.options.queryKey;
  }

  mount(): void {
    this.mountedQuery = this.query;
    this.query.addObserver();

    this.unsubscribeQuery = this.query.subscribe(() => {
      this.updateResult();
    });

    // Sync cached result with current query state.
    // Covers the gap between setOptions (render) and mount (effect) —
    // e.g. Suspense throw initiates fetch before mount, query resolves
    // but observer never received the notification.
    this.updateResult();

    const enabled = this.options.enabled ?? true;

    if (enabled && this.query.isStale()) {
      this.query.fetch().catch(() => undefined);
    }

    document.addEventListener("visibilitychange", this.handleFocusRefetch);
    window.addEventListener("focus", this.handleFocusRefetch);
    window.addEventListener("online", this.handleReconnect);
  }

  unmount(): void {
    document.removeEventListener("visibilitychange", this.handleFocusRefetch);
    window.removeEventListener("focus", this.handleFocusRefetch);
    window.removeEventListener("online", this.handleReconnect);

    this.unsubscribeQuery?.();
    this.unsubscribeQuery = null;
    this.mountedQuery?.removeObserver();
    this.mountedQuery = null;
  }

  private handleFocusRefetch = (): void => {
    if (document.visibilityState === "hidden") return;
    if (!(this.options.refetchOnWindowFocus ?? true)) return;
    if (!(this.options.enabled ?? true) || !this.query.isStale()) return;
    this.query.fetch().catch(() => undefined);
  };

  private handleReconnect = (): void => {
    if (!(this.options.refetchOnReconnect ?? true)) return;
    if (!(this.options.enabled ?? true) || !this.query.isStale()) return;
    this.query.fetch().catch(() => undefined);
  };

  private resolveQuery(options: QueryOptions<TData> & { enabled?: boolean }): Query<TData> {
    const defaults = this.dataLot.getDefaultOptions();

    const mergedOptions = {
      ...options,
      staleTime: options.staleTime ?? defaults.queries?.staleTime,
      gcTime: options.gcTime ?? defaults.queries?.gcTime,
      retry: options.retry ?? defaults.queries?.retry,
      retryDelay: options.retryDelay ?? defaults.queries?.retryDelay,
      refetchOnWindowFocus: options.refetchOnWindowFocus ?? defaults.queries?.refetchOnWindowFocus,
      refetchOnReconnect: options.refetchOnReconnect ?? defaults.queries?.refetchOnReconnect,
    };

    return this.dataLot
      .getQueryCache()
      .build<TData>(mergedOptions, defaults.queries?.staleTime, defaults.queries?.gcTime);
  }

  private updateResult(): void {
    this.result = this.buildResult();
    this.notify();
  }

  private buildResult(): UseQueryResult<TData> {
    const state = this.query.getState();
    const data =
      state.data !== undefined && this.options.select
        ? this.options.select(state.data)
        : state.data;

    return {
      data,
      error: state.error,
      status: state.status,
      fetchStatus: state.fetchStatus,
      isLoading: state.status === "pending" && state.fetchStatus === "fetching",
      isFetching: state.fetchStatus === "fetching",
      isError: state.status === "error",
      isSuccess: state.status === "success",
      refetch: () => this.query.fetch(),
    };
  }
}
