import type { Iterable } from "../../core/types/iterable.type";
import { curry } from "../curry/curry";

type Sum<T extends Iterable<bigint> | Iterable<number>> = T extends readonly []
  ? 0
  : T extends readonly [bigint, ...ReadonlyArray<unknown>]
    ? bigint
    : T[number] extends bigint
      ? bigint | 0
      : number;

/**
 * Sums the numbers in the array.
 *
 * @param data - The array of number.
 * @returns number
 *
 * @dataFirst
 * @dataLast
 *
 * @category Number
 */
export function sum<T extends Iterable<bigint> | Iterable<number>>(
  data: T,
): Sum<T>;
export function sum(): <T extends Iterable<bigint> | Iterable<number>>(
  data: T,
) => Sum<T>;
export function sum(...args: ReadonlyArray<unknown>): unknown {
  return curry(sumImplementation, args);
}

function sumImplementation<T extends Iterable<bigint> | Iterable<number>>(
  data: T,
): T[number] {
  let out = typeof data[0] === "bigint" ? 0n : 0;
  for (const value of data) {
    // @ts-expect-error
    out += value;
  }
  return out;
}
