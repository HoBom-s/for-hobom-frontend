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
  fn: (...args: any) => unknown,
  args: ReadonlyArray<unknown>,
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
