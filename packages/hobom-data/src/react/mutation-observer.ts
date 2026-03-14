import { Mutation } from "../core/mutation";
import { Subscribable } from "../core/subscribable";
import type { MutationOptions } from "../core/types";
import type { MutateCallbacks, UseMutationResult } from "./types";

export class MutationObserver<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> extends Subscribable {
  private mutation: Mutation<TData, TError, TVariables, TContext>;
  private readonly options: MutationOptions<TData, TError, TVariables, TContext>;
  private cachedResult: UseMutationResult<TData, TError, TVariables>;

  constructor(options: MutationOptions<TData, TError, TVariables, TContext>) {
    super();
    this.options = options;
    this.mutation = new Mutation(options);
    this.cachedResult = this.buildResult();
  }

  getResult(): UseMutationResult<TData, TError, TVariables> {
    return this.cachedResult;
  }

  private buildResult(): UseMutationResult<TData, TError, TVariables> {
    const state = this.mutation.getState();

    return {
      data: state.data,
      error: state.error,
      variables: state.variables,
      status: state.status,
      isIdle: state.status === "idle",
      isPending: state.status === "pending",
      isError: state.status === "error",
      isSuccess: state.status === "success",
      mutate: (variables, callbacks) => this.mutate(variables, callbacks),
      mutateAsync: (variables, callbacks) => this.mutateAsync(variables, callbacks),
      reset: () => this.reset(),
    };
  }

  private updateResult(): void {
    this.cachedResult = this.buildResult();
    this.notify();
  }

  private mutate(
    variables: TVariables,
    callbacks?: MutateCallbacks<TData, TError, TVariables>,
  ): void {
    this.mutateAsync(variables, callbacks).catch(() => undefined);
  }

  private async mutateAsync(
    variables: TVariables,
    callbacks?: MutateCallbacks<TData, TError, TVariables>,
  ): Promise<TData> {
    this.mutation = new Mutation(this.options);
    this.updateResult();

    try {
      const data = await this.mutation.execute(variables);

      callbacks?.onSuccess?.(data, variables);
      callbacks?.onSettled?.(data, null, variables);
      this.updateResult();

      return data;
    } catch (error) {
      callbacks?.onError?.(error as TError, variables);
      callbacks?.onSettled?.(undefined, error as TError, variables);
      this.updateResult();
      throw error;
    }
  }

  private reset(): void {
    this.mutation = new Mutation(this.options);
    this.mutation.reset();
    this.updateResult();
  }
}
