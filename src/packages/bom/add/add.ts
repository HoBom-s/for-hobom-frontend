import { curry } from "../curry/curry";

/**
 * Adds two numbers.
 *
 * @param target - The number.
 * @param added - The number to add to the target.
 *
 * @category Number
 */
export function add(target: number, added: number): number;
export function add(target: bigint, added: bigint): bigint;
export function add(target: number): (added: number) => number;
export function add(target: bigint): (added: bigint) => bigint;
export function add(...args: ReadonlyArray<unknown>): unknown {
  return curry(addImpl, args);
}

function addImpl(target: number, added: number) {
  return target + added;
}
