import type { MutationOptions } from "../core/types";

export function mutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: MutationOptions<TData, TError, TVariables, TContext>,
): MutationOptions<TData, TError, TVariables, TContext> {
  return options;
}
