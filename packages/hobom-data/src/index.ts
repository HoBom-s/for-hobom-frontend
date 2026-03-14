import { DataLot } from "./core/data-lot";
import { DataLotProvider } from "./react/context";
import { queryOptions } from "./options/query-options";
import { mutationOptions } from "./options/mutation-options";
import { infiniteQueryOptions } from "./options/infinite-query-options";
import { useQuery } from "./react/use-query";
import { useSuspenseQuery } from "./react/use-suspense-query";
import { useSuspenseQueries } from "./react/use-suspense-queries";
import { useQueries } from "./react/use-queries";
import { useMutation } from "./react/use-mutation";
import { useInfiniteQuery } from "./react/use-infinite-query";
import { useSuspenseInfiniteQuery } from "./react/use-suspense-infinite-query";
import { useDataLot } from "./react/use-data-lot";

const DataLotWithStatics = Object.assign(DataLot, {
  Provider: DataLotProvider,
  queryOptions,
  mutationOptions,
  infiniteQueryOptions,
});

const DataKernel = {
  useQuery,
  useSuspenseQuery,
  useSuspenseQueries,
  useQueries,
  useMutation,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useDataLot,
} as const;

export const HoBom = {
  DataLot: DataLotWithStatics,
  DataKernel,
} as const;

// Named exports for direct import (migration-friendly)
export {
  DataLot,
  DataLotProvider,
  queryOptions,
  mutationOptions,
  infiniteQueryOptions,
  useQuery,
  useSuspenseQuery,
  useSuspenseQueries,
  useQueries,
  useMutation,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useDataLot,
};

export type {
  QueryKey,
  QueryOptions,
  MutationOptions,
  InfiniteData,
  InfiniteQueryOptions,
} from "./core/types";
export type {
  UseQueryResult,
  UseSuspenseQueryResult,
  UseMutationResult,
  UseQueryOptions,
  UseSuspenseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryResult,
  UseSuspenseInfiniteQueryResult,
} from "./react/types";
export type { DefinedQueryOptions } from "./options/query-options";
export type { DefinedInfiniteQueryOptions } from "./options/infinite-query-options";
