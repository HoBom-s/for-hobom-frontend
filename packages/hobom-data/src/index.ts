import { DataLot } from "./core/data-lot";
import { DataLotProvider } from "./react/context";
import { queryOptions } from "./options/query-options";
import { mutationOptions } from "./options/mutation-options";
import { useQuery } from "./react/use-query";
import { useSuspenseQuery } from "./react/use-suspense-query";
import { useSuspenseQueries } from "./react/use-suspense-queries";
import { useMutation } from "./react/use-mutation";
import { useDataLot } from "./react/use-data-lot";

const DataLotWithStatics = Object.assign(DataLot, {
  Provider: DataLotProvider,
  queryOptions,
  mutationOptions,
});

const DataKernel = {
  useQuery,
  useSuspenseQuery,
  useSuspenseQueries,
  useMutation,
  useDataLot,
} as const;

export const HoBom = {
  DataLot: DataLotWithStatics,
  DataKernel,
} as const;

export type { DataLot } from "./core/data-lot";
export type { QueryKey, QueryOptions, MutationOptions } from "./core/types";
export type {
  UseQueryResult,
  UseSuspenseQueryResult,
  UseMutationResult,
  UseQueryOptions,
  UseSuspenseQueryOptions,
  UseMutationOptions,
} from "./react/types";
export type { DefinedQueryOptions } from "./options/query-options";
