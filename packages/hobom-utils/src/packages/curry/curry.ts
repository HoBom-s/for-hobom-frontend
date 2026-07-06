import { dataLastImpl } from "../../core/dataLastImpl";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Creates a function with `data first` and `data last` signatures.
 *
 * @param fn - The function to curry.
 * @param args - The arguments.
 * @param lazy - Lazy version of the function to curry.
 *
 * @category Function
 */
export function curry(
  // Accepts a function of any arity and calls it with collected args; `unknown[]`
  // args would be uncallable and `never[]` would reject real functions.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any) => unknown,
  args: readonly unknown[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lazy?: (...args: any) => Evaluator,
) {
  const diff = fn.length - args.length;

  if (diff === 0) {
    return fn(...args);
  }
  if (diff === 1) {
    return dataLastImpl(fn, args, lazy);
  }

  throw new Error("Wrong number of args");
}
