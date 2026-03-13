import { curry } from "../curry/curry";
import type { Evaluator } from "../../core/types/evaluator.type";

/**
 * Returns the first element satisfying the predicate, or undefined if not found.
 * Supports early termination when used in a pipe (lazy).
 *
 * @param data - The array.
 * @param predicate - A function to test each element.
 * @returns The first matching element, or undefined.
 *
 * @dataLast
 * @lazy
 *
 * @category Array
 */
export function find<T, S extends T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => v is S,
): S | undefined;
export function find<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): T | undefined;
export function find<T, S extends T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => v is S,
): (data: ReadonlyArray<T>) => S | undefined;
export function find<T>(
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): (data: ReadonlyArray<T>) => T | undefined;
export function find(...args: ReadonlyArray<unknown>): unknown {
  return curry(findImpl, args, lazyImpl);
}

function findImpl<T>(
  data: ReadonlyArray<T>,
  predicate: (v: T, index: number, arr: ReadonlyArray<T>) => boolean,
): T | undefined {
  return data.find(predicate);
}

// single: true tells pipe to unwrap the accumulator to a single value, not an array.
const lazyImpl = Object.assign(
  function lazyFind<T>(
    predicate: (item: T, index: number, arr: ReadonlyArray<T>) => boolean,
  ): Evaluator<T, T> {
    return (item, index, arr) =>
      predicate(item, index, arr)
        ? { done: true, hasNext: true, next: item }
        : { done: false, hasNext: false };
  },
  { single: true as const },
);
