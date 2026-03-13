import { curry } from "../curry/curry";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Executes a provided function once filter each array element. Equivalent to
 * `Array.prototype.filter`.
 *
 * @param data - The array.
 * @param predicate - A function to execute filter element in the array.
 * @returns The filtered array.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function filter<T>(
  data: T[],
  predicate: (v: T, index: number, data: readonly T[]) => boolean,
): T[];
export function filter<T, S extends T>(
  data: readonly T[],
  predicate: (value: T, index: number, data: readonly T[]) => value is S,
): S[];
export function filter<T, S extends T>(
  predicate: (v: T, index: number, data: readonly T[]) => v is S,
): (data: readonly T[]) => S[];
export function filter<T>(
  predicate: (v: T, index: number, data: readonly T[]) => boolean,
): (data: readonly T[]) => T[];
export function filter(...args: readonly unknown[]): unknown {
  return curry(filterImpl, args, lazyImpl);
}

function filterImpl<T>(
  data: T[],
  predicate: (item: T, index: number, arr: readonly T[]) => boolean,
): T[] {
  return data.filter(predicate);
}

function lazyImpl<T>(
  predicate: (item: T, index: number, arr: readonly T[]) => boolean,
): Evaluator<T> {
  return (item, index, arr) =>
    predicate(item, index, arr)
      ? { done: false, hasNext: true, next: item }
      : { done: false, hasNext: false };
}
