import { curry } from "../curry/curry";

/**
 * Subtract function.
 *
 * @param value - The number.
 * @param subtrahend - The number to subtract from the value.
 * @return number
 *
 * @dataLast
 * @dataFirst
 *
 * @category Function
 */
export function subtract(value: bigint, subtrahend: bigint): bigint;
export function subtract(value: number, subtrahend: number): number;
export function subtract(subtrahend: bigint): (value: bigint) => bigint;
export function subtract(subtrahend: number): (value: number) => number;
export function subtract(...args: ReadonlyArray<unknown>): unknown {
  return curry(subtractImpl, args);
}

function subtractImpl(v: number, subtrahend: number): number {
  return v - subtrahend;
}
