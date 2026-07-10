import { hashKey } from "../core/hash-key";
import { Subscribable } from "../core/subscribable";
import type { DataLot } from "../core/data-lot";
import type { Query } from "../core/query";
import type { InfiniteData, InfiniteQueryOptions, QueryKey } from "../core/types";
import type { UseInfiniteQueryResult } from "./types";

export class InfiniteQueryObserver<TData = unknown, TPageParam = unknown> extends Subscribable {
  private options: InfiniteQueryOptions<TData, TPageParam>;
  private dataLot: DataLot;
  private query: Query<InfiniteData<TData, TPageParam>>;
  private result: UseInfiniteQueryResult<TData, TPageParam>;
  private unsubscribeQuery: (() => void) | null = null;
  private mountedQuery: Query<InfiniteData<TData, TPageParam>> | null = null;
  private refetchIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor(dataLot: DataLot, options: InfiniteQueryOptions<TData, TPageParam>) {
    super();
    this.dataLot = dataLot;
    this.options = options;
    this.query = this.resolveQuery(options);
    this.result = this.buildResult();
  }

  setOptions(options: InfiniteQueryOptions<TData, TPageParam>): void {
    const prevHash = hashKey(this.options.queryKey);
    const nextHash = hashKey(options.queryKey);

    this.options = options;

    if (prevHash !== nextHash) {
      this.query = this.resolveQuery(options);
      this.result = this.buildResult();
    }
  }

  getResult(): UseInfiniteQueryResult<TData, TPageParam> {
    return this.result;
  }

  getQuery(): Query<InfiniteData<TData, TPageParam>> {
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

    this.updateResult();

    const enabled = this.options.enabled ?? true;

    if (enabled && this.query.isStale()) {
      this.query.fetch().catch(() => undefined);
    }

    if (this.options.refetchInterval) {
      this.refetchIntervalId = setInterval(() => {
        if (this.options.enabled !== false) {
          this.query.fetch().catch(() => undefined);
        }
      }, this.options.refetchInterval);
    }

    document.addEventListener("visibilitychange", this.handleFocusRefetch);
    window.addEventListener("focus", this.handleFocusRefetch);
    window.addEventListener("online", this.handleReconnect);
  }

  unmount(): void {
    document.removeEventListener("visibilitychange", this.handleFocusRefetch);
    window.removeEventListener("focus", this.handleFocusRefetch);
    window.removeEventListener("online", this.handleReconnect);

    if (this.refetchIntervalId !== null) {
      clearInterval(this.refetchIntervalId);
      this.refetchIntervalId = null;
    }

    this.unsubscribeQuery?.();
    this.unsubscribeQuery = null;
    this.mountedQuery?.removeObserver();
    this.mountedQuery = null;
  }

  async fetchNextPage(): Promise<void> {
    const currentData = this.query.getState().data;

    if (!currentData) return;

    const lastPage = currentData.pages[currentData.pages.length - 1];

    if (lastPage === undefined) return;

    const nextPageParam = this.options.getNextPageParam(lastPage, currentData.pages);

    if (nextPageParam === undefined) return;

    const newPage = await this.options.queryFn({
      queryKey: this.options.queryKey,
      signal: new AbortController().signal,
      pageParam: nextPageParam,
    });

    const newData: InfiniteData<TData, TPageParam> = {
      pages: [...currentData.pages, newPage],
      pageParams: [...currentData.pageParams, nextPageParam],
    };

    this.query.setData(newData);
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

  private resolveQuery(
    options: InfiniteQueryOptions<TData, TPageParam>,
  ): Query<InfiniteData<TData, TPageParam>> {
    const defaults = this.dataLot.getDefaultOptions();

    const wrappedQueryFn = async (context: { queryKey: QueryKey; signal: AbortSignal }) => {
      const firstPage = await options.queryFn({
        ...context,
        pageParam: options.initialPageParam,
      });

      return {
        pages: [firstPage],
        pageParams: [options.initialPageParam],
      } as InfiniteData<TData, TPageParam>;
    };

    const mergedOptions = {
      queryKey: options.queryKey,
      queryFn: wrappedQueryFn,
      staleTime: options.staleTime ?? defaults.queries?.staleTime,
      gcTime: options.gcTime ?? defaults.queries?.gcTime,
      retry: options.retry ?? defaults.queries?.retry,
      retryDelay: options.retryDelay ?? defaults.queries?.retryDelay,
      refetchOnWindowFocus: options.refetchOnWindowFocus ?? defaults.queries?.refetchOnWindowFocus,
      refetchOnReconnect: options.refetchOnReconnect ?? defaults.queries?.refetchOnReconnect,
    };

    return this.dataLot
      .getQueryCache()
      .build(mergedOptions, defaults.queries?.staleTime, defaults.queries?.gcTime);
  }

  private updateResult(): void {
    this.result = this.buildResult();
    this.notify();
  }

  private buildResult(): UseInfiniteQueryResult<TData, TPageParam> {
    const state = this.query.getState();
    const data = state.data ?? undefined;
    const lastPage = data ? data.pages[data.pages.length - 1] : undefined;
    const hasNextPage =
      lastPage !== undefined && data !== undefined
        ? this.options.getNextPageParam(lastPage, data.pages) !== undefined
        : false;

    return {
      data,
      error: state.error,
      status: state.status,
      fetchStatus: state.fetchStatus,
      isLoading: state.status === "pending" && state.fetchStatus === "fetching",
      isFetching: state.fetchStatus === "fetching",
      isError: state.status === "error",
      isSuccess: state.status === "success",
      isPending: state.status === "pending",
      hasNextPage,
      isFetchingNextPage: false,
      fetchNextPage: () => this.fetchNextPage(),
      refetch: () => this.query.fetch(),
    };
  }
}
