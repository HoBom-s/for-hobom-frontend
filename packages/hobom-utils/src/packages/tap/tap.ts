import { curry } from "../curry/curry";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Executes a side-effect function on the value and returns the value unchanged.
 * When used in a pipe over an array, the callback is called per element.
 *
 * @param data - The value.
 * @param fn - Side-effect function.
 * @returns The original value.
 *
 * @dataLast
 * @lazy
 *
 * @category Function
 */
export function tap<T>(data: T, fn: (item: T) => void): T;
export function tap<T>(fn: (item: T) => void): (data: T) => T;
export function tap(...args: readonly unknown[]): unknown {
  return curry(tapImpl, args, lazyImpl);
}

function tapImpl<T>(data: T, fn: (item: T) => void): T {
  fn(data);

  return data;
}

function lazyImpl<T>(fn: (item: T) => void): Evaluator<T, T> {
  return (item) => {
    fn(item);

    return { done: false, hasNext: true, next: item };
  };
}
