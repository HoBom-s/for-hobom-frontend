import type { QueryKey, QueryOptions } from "../core/types";

export interface DefinedQueryOptions<
  TData = unknown,
  TQueryKey extends QueryKey = QueryKey,
> extends QueryOptions<TData, TQueryKey> {
  queryKey: TQueryKey;
  queryFn: QueryOptions<TData, TQueryKey>["queryFn"];
}

export function queryOptions<TData, TQueryKey extends QueryKey = QueryKey>(
  options: DefinedQueryOptions<TData, TQueryKey>,
): DefinedQueryOptions<TData, TQueryKey> {
  return options;
}
