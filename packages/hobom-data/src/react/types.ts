import type { QueryKey, QueryOptions, MutationOptions, InfiniteData } from "../core/types";

export interface UseQueryOptions<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey,
> extends QueryOptions<TData, TQueryKey> {
  enabled?: boolean;
  select?: (data: TData) => TData;
  /** Type brand for error inference. Not used at runtime. */
  _errorType?: TError;
}

export interface UseQueryResult<TData = unknown, TError = Error> {
  data: TData | undefined;
  error: TError | null;
  status: "pending" | "success" | "error";
  fetchStatus: "idle" | "fetching";
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<TData>;
}

export interface UseSuspenseQueryResult<TData = unknown> {
  data: TData;
  error: null;
  status: "success";
  fetchStatus: "idle" | "fetching";
  isFetching: boolean;
  refetch: () => Promise<TData>;
}

export type UseSuspenseQueryOptions<TData = unknown, TQueryKey extends QueryKey = QueryKey> = Omit<
  QueryOptions<TData, TQueryKey>,
  "enabled"
> & {
  select?: (data: TData) => TData;
};

export type UseMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = MutationOptions<TData, TError, TVariables, TContext>;

export interface UseMutationResult<TData = unknown, TError = Error, TVariables = void> {
  data: TData | undefined;
  error: TError | null;
  variables: TVariables | undefined;
  status: "idle" | "pending" | "success" | "error";
  isIdle: boolean;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  mutate: (variables: TVariables, callbacks?: MutateCallbacks<TData, TError, TVariables>) => void;
  mutateAsync: (
    variables: TVariables,
    callbacks?: MutateCallbacks<TData, TError, TVariables>,
  ) => Promise<TData>;
  reset: () => void;
}

export interface MutateCallbacks<TData = unknown, TError = Error, TVariables = void> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

export interface UseInfiniteQueryResult<TData = unknown, TPageParam = unknown, TError = Error> {
  data: InfiniteData<TData, TPageParam> | undefined;
  error: TError | null;
  status: "pending" | "success" | "error";
  fetchStatus: "idle" | "fetching";
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  refetch: () => Promise<InfiniteData<TData, TPageParam>>;
}

export interface UseSuspenseInfiniteQueryResult<TData = unknown, TPageParam = unknown> {
  data: InfiniteData<TData, TPageParam>;
  error: null;
  status: "success";
  fetchStatus: "idle" | "fetching";
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  refetch: () => Promise<InfiniteData<TData, TPageParam>>;
}
