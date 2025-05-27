import { curry } from "../curry/curry";
import type { Writable } from "type-fest";
import type { Evaluator } from "../../core/types/evaluator.type";
import type { Iterable } from "../../core/types/iterable.type";

/**
 * Executes a provided function once for each array element. Equivalent to
 * `Array.prototype.forEach`.
 *
 * @param data - The values that would be iterated on.
 * @param cb - A function to execute for each element in the array.
 *
 * @category Function
 */
export function forEach<T extends Iterable>(
  data: T,
  cb: (value: T[number], index: number, data: T) => void,
): void;
/**
 * Executes a provided function once for each array element. Equivalent to
 * `Array.prototype.forEach`.
 *
 * @param cb - A function to execute for each element in the array.
 * @returns The original array.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function forEach<T extends Iterable>(
  cb: (value: T[number], index: number, data: T) => void,
): (data: T) => Writable<T>;
export function forEach(...args: ReadonlyArray<unknown>): unknown {
  return curry(forEachImpl, args, lazyImplementation);
}

function forEachImpl<T>(
  data: ReadonlyArray<T>,
  cb: (value: T, index: number, data: ReadonlyArray<T>) => void,
): ReadonlyArray<T> {
  data.forEach(cb);
  return data;
}

const lazyImplementation =
  <T>(
    cb: (value: T, index: number, data: ReadonlyArray<T>) => void,
  ): Evaluator<T> =>
  (value, index, data) => {
    cb(value, index, data);
    return { done: false, hasNext: true, next: value };
  };
