import { QueryCache } from "./query-cache";
import type { DefaultOptions, QueryFilters, QueryKey, Updater } from "./types";

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

  setQueryData<TData>(queryKey: QueryKey, updater: Updater<TData | undefined, TData>): TData {
    let query = this.queryCache.get<TData>(queryKey);
    const prevData = query?.getState().data;

    const newData =
      typeof updater === "function"
        ? (updater as (old: TData | undefined) => TData)(prevData)
        : updater;

    if (!query) {
      query = this.queryCache.build<TData>(
        {
          queryKey,
          queryFn: () => Promise.resolve(newData),
          staleTime: this.defaultOptions.queries?.staleTime,
          gcTime: this.defaultOptions.queries?.gcTime,
        },
        this.defaultOptions.queries?.staleTime,
        this.defaultOptions.queries?.gcTime,
      );
    }

    query.setData(newData);

    return newData;
  }

  async invalidates(filters: QueryFilters): Promise<void> {
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

  async cancelQueries(filters: QueryFilters): Promise<void> {
    const queries = this.queryCache.findAll(filters);

    for (const query of queries) {
      query.cancel();
    }
  }

  clear(): void {
    this.queryCache.clear();
  }
}
