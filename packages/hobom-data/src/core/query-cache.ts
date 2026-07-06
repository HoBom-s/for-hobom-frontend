import { hashKey, partialMatchKey } from "./hash-key";
import { Query } from "./query";
import type { QueryFilters, QueryKey, QueryOptions } from "./types";

export class QueryCache {
  private queries = new Map<string, Query>();

  build<TData>(
    options: QueryOptions<TData>,
    defaultStaleTime?: number,
    defaultGcTime?: number,
  ): Query<TData> {
    const hash = hashKey(options.queryKey);
    const existing = this.queries.get(hash) as Query<TData> | undefined;

    if (existing) return existing;

    const mergedOptions = {
      ...options,
      staleTime: options.staleTime ?? defaultStaleTime,
      gcTime: options.gcTime ?? defaultGcTime,
    };

    const query = new Query<TData>(hash, mergedOptions);

    query.onGc(() => {
      this.remove(hash);
    });

    this.queries.set(hash, query as unknown as Query);

    return query;
  }

  get<TData = unknown>(queryKey: QueryKey): Query<TData> | undefined {
    const hash = hashKey(queryKey);

    return this.queries.get(hash) as Query<TData> | undefined;
  }

  findAll(filters?: QueryFilters): Query[] {
    if (!filters?.queryKey) return [...this.queries.values()];

    const { queryKey } = filters;

    return [...this.queries.values()].filter((query) =>
      partialMatchKey(queryKey, query.queryKey),
    );
  }

  remove(hash: string): void {
    const query = this.queries.get(hash);

    if (query) {
      this.queries.delete(hash);
      query.destroy();
    }
  }

  clear(): void {
    for (const query of this.queries.values()) {
      query.destroy();
    }
    this.queries.clear();
  }

  getSize(): number {
    return this.queries.size;
  }
}
