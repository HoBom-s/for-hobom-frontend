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
  predicate: (v: T, index: number, data: ReadonlyArray<T>) => boolean,
): Array<T>;
export function filter<T, S extends T>(
  data: ReadonlyArray<T>,
  predicate: (value: T, index: number, data: ReadonlyArray<T>) => value is S,
): Array<S>;
export function filter<T, S extends T>(
  predicate: (v: T, index: number, data: ReadonlyArray<T>) => v is S,
): (data: ReadonlyArray<T>) => Array<S>;
export function filter<T>(
  predicate: (v: T, index: number, data: ReadonlyArray<T>) => boolean,
): (data: ReadonlyArray<T>) => Array<T>;
export function filter(...args: ReadonlyArray<unknown>): unknown {
  return curry(filterImpl, args, lazyImpl);
}

function filterImpl<T>(
  data: T[],
  predicate: (item: T, index: number, arr: ReadonlyArray<T>) => boolean,
): Array<T> {
  return data.filter(predicate);
}

function lazyImpl<T>(
  predicate: (item: T, index: number, arr: ReadonlyArray<T>) => boolean,
): Evaluator<T> {
  return (item, index, arr) =>
    predicate(item, index, arr)
      ? { done: false, hasNext: true, next: item }
      : { done: false, hasNext: false };
}
