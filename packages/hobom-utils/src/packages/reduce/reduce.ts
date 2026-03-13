import { curry } from "../curry/curry";

/**
 * Executes a user-supplied "reducer" callback function on each element of the array,
 *
 * @param data - The original data.
 * @param cb - The callback function.
 * @param initialValue - Initial data.
 * @returns The value that results from running the "reducer" callback function.
 *
 * @dataFirst
 * @dataLast
 *
 * @category Array
 */
export function reduce<T, U>(
  data: ReadonlyArray<T>,
  cb: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    data: ReadonlyArray<T>,
  ) => U,
  initialValue: U,
): U;
export function reduce<T, U>(
  cb: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    data: ReadonlyArray<T>,
  ) => U,
  initialValue: U,
): (data: ReadonlyArray<T>) => U;
export function reduce(...args: ReadonlyArray<unknown>): unknown {
  return curry(reduceImpl, args);
}

function reduceImpl<T, U>(
  data: ReadonlyArray<T>,
  cb: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    data: ReadonlyArray<T>,
  ) => U,
  initialValue: U,
): U {
  return data.reduce(cb, initialValue);
}
