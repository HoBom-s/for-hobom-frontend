import { QueryCache } from "./query-cache";
import type { DefaultOptions, QueryFilters, QueryKey, QueryOptions, Updater } from "./types";

export class DataLot {
  private readonly queryCache: QueryCache;
  private readonly defaultOptions: DefaultOptions;

  constructor(config?: { defaultOptions?: DefaultOptions }) {
    this.queryCache = new QueryCache();
    this.defaultOptions = config?.defaultOptions ?? {};
  }

  getQueryCache(): QueryCache {
    return this.queryCache;
  }

  getDefaultOptions(): DefaultOptions {
    return this.defaultOptions;
  }

  getQueryData<TData = unknown>(queryKey: QueryKey): TData | undefined {
    return this.queryCache.get<TData>(queryKey)?.getState().data;
  }

  setQueryData<TData>(
    queryKey: QueryKey,
    updater: Updater<TData | undefined, TData | undefined>,
  ): TData | undefined {
    let query = this.queryCache.get<TData>(queryKey);
    const prevData = query?.getState().data;

    const newData =
      typeof updater === "function"
        ? (updater as (old: TData | undefined) => TData | undefined)(prevData)
        : updater;

    if (!query) {
      query = this.queryCache.build<TData>(
        {
          queryKey,
          queryFn: () => Promise.resolve(newData as TData),
          staleTime: this.defaultOptions.queries?.staleTime,
          gcTime: this.defaultOptions.queries?.gcTime,
        },
        this.defaultOptions.queries?.staleTime,
        this.defaultOptions.queries?.gcTime,
      );
    }

    query.setData(newData as TData);

    return newData;
  }

  async invalidates(filters?: QueryFilters): Promise<void> {
    const queries = this.queryCache.findAll(filters);
    const refetchPromises = queries.map((query) => {
      if (query.getObserverCount() > 0) {
        query.cancel();

        return query.fetch().catch(() => undefined);
      }

      return Promise.resolve();
    });

    await Promise.all(refetchPromises);
  }

  async invalidateQueries(filters?: QueryFilters): Promise<void> {
    return this.invalidates(filters);
  }

  async prefetchQuery<TData>(options: QueryOptions<TData>): Promise<void> {
    const query = this.queryCache.build<TData>(
      {
        ...options,
        staleTime: options.staleTime ?? this.defaultOptions.queries?.staleTime,
        gcTime: options.gcTime ?? this.defaultOptions.queries?.gcTime,
      },
      this.defaultOptions.queries?.staleTime,
      this.defaultOptions.queries?.gcTime,
    );

    if (query.isStale()) {
      await query.fetch().catch(() => undefined);
    }
  }

  async cancelQueries(filters?: QueryFilters): Promise<void> {
    const queries = this.queryCache.findAll(filters);

    for (const query of queries) {
      query.cancel();
    }
  }

  clear(): void {
    this.queryCache.clear();
  }
}
