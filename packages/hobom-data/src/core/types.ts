export type QueryKey = readonly unknown[];

export type QueryStatus = "pending" | "success" | "error";
export type FetchStatus = "idle" | "fetching";

export interface QueryState<TData = unknown, TError = Error> {
  status: QueryStatus;
  data: TData | undefined;
  error: TError | null;
  fetchStatus: FetchStatus;
  dataUpdatedAt: number;
}

export interface QueryOptions<TData = unknown, TQueryKey extends QueryKey = QueryKey> {
  queryKey: TQueryKey;
  queryFn: (context: QueryFnContext) => Promise<TData>;
  staleTime?: number;
  gcTime?: number;
  enabled?: boolean;
  retry?: number | false;
  retryDelay?: number | ((attempt: number) => number);
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
}

export interface QueryFnContext {
  queryKey: QueryKey;
  signal: AbortSignal;
}

export interface MutationState<TData = unknown, TError = Error, TVariables = void> {
  status: QueryStatus | "idle";
  data: TData | undefined;
  error: TError | null;
  variables: TVariables | undefined;
  submittedAt: number;
}

export interface MutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> {
  mutationKey?: QueryKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
  onSuccess?: (data: TData, variables: TVariables, context: TContext) => Promise<unknown> | unknown;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | unknown;
}

export interface DefaultOptions {
  queries?: {
    staleTime?: number;
    gcTime?: number;
    retry?: number | false;
    retryDelay?: number | ((attempt: number) => number);
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
  };
}

export interface QueryFilters {
  queryKey?: QueryKey;
}

export type Updater<TInput, TOutput> = TOutput | ((old: TInput) => TOutput);
