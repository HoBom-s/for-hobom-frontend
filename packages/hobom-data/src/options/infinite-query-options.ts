import type { QueryKey, InfiniteQueryOptions } from "../core/types";

export type DefinedInfiniteQueryOptions<
  TData = unknown,
  TPageParam = unknown,
  TQueryKey extends QueryKey = QueryKey,
> = InfiniteQueryOptions<TData, TPageParam, TQueryKey>;

export function infiniteQueryOptions<TData, TPageParam, TQueryKey extends QueryKey = QueryKey>(
  options: DefinedInfiniteQueryOptions<TData, TPageParam, TQueryKey>,
): DefinedInfiniteQueryOptions<TData, TPageParam, TQueryKey> {
  return options;
}
