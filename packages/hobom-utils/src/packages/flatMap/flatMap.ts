import { curry } from "../curry/curry";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Maps each element to an array and flattens the result by one level.
 * Equivalent to `Array.prototype.flatMap`.
 *
 * @param data - The array.
 * @param cb - A function returning an array for each element.
 * @returns A new flattened array.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function flatMap<T, U>(
  data: readonly T[],
  cb: (item: T, index: number, arr: readonly T[]) => readonly U[],
): U[];
export function flatMap<T, U>(
  cb: (item: T, index: number, arr: readonly T[]) => readonly U[],
): (data: readonly T[]) => U[];
export function flatMap(...args: readonly unknown[]): unknown {
  return curry(flatMapImpl, args, lazyImpl);
}

function flatMapImpl<T, U>(
  data: readonly T[],
  cb: (item: T, index: number, arr: readonly T[]) => readonly U[],
): U[] {
  return (data as T[]).flatMap(cb as unknown as (item: T, index: number, arr: T[]) => U[]);
}

function lazyImpl<T, U>(
  cb: (item: T, index: number, arr: readonly T[]) => readonly U[],
): Evaluator<T, U> {
  return (item, index, arr) => ({
    done: false,
    hasNext: true,
    hasMany: true,
    next: cb(item, index, arr),
  });
}
