import { curry } from "../curry/curry";
import type { Iterable, Mappable } from "../../core/types/iterable.type";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Execute a provided function once map each array element. Equivalent to
 * `Array.prototype.map`.
 *
 * @param data - The array.
 * @param cb - A function to execute map element in the array.
 * @returns The mapped array.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function map<T extends Iterable, U>(
  data: T,
  cb: (item: T[number], index: number, arr: T) => U,
): Mappable<T, U>;
export function map<T extends Iterable, U>(
  cb: (v: T[number], index: number, arr: T) => U,
): (data: T) => Mappable<T, U>;
export function map(...args: ReadonlyArray<unknown>): unknown {
  return curry(mapImpl, args, lazyImpl);
}

function mapImpl<T, U>(
  data: ReadonlyArray<T>,
  cb: (item: T, index: number, arr: ReadonlyArray<T>) => U,
): Array<U> {
  return data.map(cb);
}

function lazyImpl<T, U>(
  cb: (item: T, index: number, arr: ReadonlyArray<T>) => U,
): Evaluator<T, U> {
  return (item, index, arr) => ({
    done: false,
    hasNext: true,
    next: cb(item, index, arr),
  });
}
