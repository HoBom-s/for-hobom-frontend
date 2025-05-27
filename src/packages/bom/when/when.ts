import type { InferGuardType } from "../../core/types/inferGuardType";

/**
 * Check cases.
 *
 * @param data - The data to be passed to all functions, as the first param.
 * @param predicate - Decides if the `onTrue` mapper should run or not. If it's
 *                      a type predicate it also narrows types for the mappers and the return value.
 * @param onTrue - The function that would run when the predicate returns
 *                      `true`.
 * @param extraArgs - Additional arguments. These would be passed as is to the
 * `predicate`, `onTrue`, and `onFalse` functions.
 * @example
 *   when(data, isNullish, constant(42));
 *   when(data, (x) => x > 3, { onTrue: add(1), onFalse: multiply(2) });
 *   when(data, isString, (x, radix) => parseInt(x, radix), 10);
 *
 * @dataFirst
 *
 * @category Function
 */
export function when<
  T,
  ExtraArgs extends Array<any>,
  Predicate extends (data: T, ...extraArgs: ExtraArgs) => boolean,
  OnTrue extends (
    data: InferGuardType<Predicate, T>,
    ...extraArgs: ExtraArgs
  ) => unknown,
>(
  predicate: Predicate,
  onTrue: OnTrue,
): (
  data: T,
  ...extraArgs: ExtraArgs
) => Exclude<T, InferGuardType<Predicate>> | ReturnType<OnTrue>;
export function when<
  T,
  ExtraArgs extends Array<any>,
  Predicate extends (data: T, ...extraArgs: ExtraArgs) => boolean,
  OnTrue extends (
    data: InferGuardType<Predicate, T>,
    ...extraArgs: ExtraArgs
  ) => unknown,
  OnFalse extends (
    data: Exclude<T, InferGuardType<Predicate>>,
    ...extraArgs: ExtraArgs
  ) => unknown,
>(
  predicate: Predicate,
  branches: {
    readonly onTrue: OnTrue;
    readonly onFalse: OnFalse;
  },
): (
  data: T,
  ...extraArgs: ExtraArgs
) => ReturnType<OnFalse> | ReturnType<OnTrue>;
export function when<
  T,
  ExtraArgs extends Array<any>,
  Predicate extends (data: T, ...extraArgs: ExtraArgs) => boolean,
  OnTrue extends (
    data: InferGuardType<Predicate, T>,
    ...extraArgs: ExtraArgs
  ) => unknown,
>(
  data: T,
  predicate: Predicate,
  onTrue: OnTrue,
  ...extraArgs: ExtraArgs
): Exclude<T, InferGuardType<Predicate>> | ReturnType<OnTrue>;
export function when<
  T,
  ExtraArgs extends Array<any>,
  Predicate extends (data: T, ...extraArgs: ExtraArgs) => boolean,
  OnTrue extends (
    data: InferGuardType<Predicate, T>,
    ...extraArgs: ExtraArgs
  ) => unknown,
  OnFalse extends (
    data: Exclude<T, InferGuardType<Predicate>>,
    ...extraArgs: ExtraArgs
  ) => unknown,
>(
  data: T,
  predicate: Predicate,
  branches: {
    readonly onTrue: OnTrue;
    readonly onFalse: OnFalse;
  },
  ...extraArgs: ExtraArgs
): ReturnType<OnFalse> | ReturnType<OnTrue>;
export function when(...args: ReadonlyArray<unknown>): unknown {
  if (args.length === 2) {
    return (data: unknown, ...extraArgs: ReadonlyArray<unknown>) =>
      // @ts-expect-error
      whenImpl(data, ...args, ...extraArgs);
  }

  // @ts-expect-error
  return whenImpl(...args);
}

function whenImpl<T, ExtraArgs extends Array<any>, WhenTrue, WhenFalse>(
  data: T,
  predicate: (data: T, ...extraArgs: ExtraArgs) => boolean,
  onTrueOrBranches:
    | ((data: T, ...extraArgs: ExtraArgs) => WhenTrue)
    | {
        readonly onTrue: (data: T, ...extraArgs: ExtraArgs) => WhenTrue;
        readonly onFalse: (data: T, ...extraArgs: ExtraArgs) => WhenFalse;
      },
  ...extraArgs: ExtraArgs
): T | WhenFalse | WhenTrue {
  if (predicate(data, ...extraArgs)) {
    if (typeof onTrueOrBranches === "function") {
      return onTrueOrBranches(data, ...extraArgs);
    }

    return onTrueOrBranches.onTrue(data, ...extraArgs);
  }

  if (typeof onTrueOrBranches === "function") {
    return data;
  }

  return onTrueOrBranches.onFalse(data, ...extraArgs);
}
