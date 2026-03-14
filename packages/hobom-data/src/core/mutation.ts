import type { MutationOptions, MutationState } from "./types";

const IDLE_STATE = {
  status: "idle" as const,
  data: undefined,
  error: null,
  variables: undefined,
  submittedAt: 0,
};

export class Mutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown> {
  private state: MutationState<TData, TError, TVariables>;
  private readonly options: MutationOptions<TData, TError, TVariables, TContext>;

  constructor(options: MutationOptions<TData, TError, TVariables, TContext>) {
    this.options = options;
    this.state = {
      status: "idle",
      data: undefined,
      error: null,
      variables: undefined,
      submittedAt: 0,
    };
  }

  getState(): MutationState<TData, TError, TVariables> {
    return this.state;
  }

  reset(): void {
    this.state = { ...IDLE_STATE } as MutationState<TData, TError, TVariables>;
  }

  async execute(variables: TVariables): Promise<TData> {
    this.state = {
      status: "pending",
      data: undefined,
      error: null,
      variables,
      submittedAt: Date.now(),
    };

    let context: TContext | undefined;

    try {
      context = (await this.options.onMutate?.(variables)) as TContext | undefined;

      const data = await this.options.mutationFn(variables);

      this.state = {
        ...this.state,
        status: "success",
        data,
        error: null,
      };

      await this.options.onSuccess?.(data, variables, context!);
      await this.options.onSettled?.(data, null, variables, context);

      return data;
    } catch (error) {
      this.state = {
        ...this.state,
        status: "error",
        error: error as TError,
      };

      await this.options.onError?.(error as TError, variables, context);
      await this.options.onSettled?.(undefined, error as TError, variables, context);

      throw error;
    }
  }
}
