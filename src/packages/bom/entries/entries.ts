import type { Simplify } from "type-fest";
import { curry } from "@/packages/bom/curry/curry.ts";

type EntryForKey<T, Key extends keyof T> = Key extends number | string
  ? [key: `${Key}`, value: Required<T>[Key]]
  : never;
type Entry<T> = Simplify<{ [P in keyof T]-?: EntryForKey<T, P> }[keyof T]>;

/**
 * Returns an array of a given object's own enumerable string-keyed property
 * key-value pairs.
 *
 * @param data - An object
 *
 * @category Object
 *
 * @dataFirst
 * @dataLast
 */
export function entries<T extends object>(data: T): Array<Entry<T>>;
export function entries(): <T extends object>(data: T) => Array<Entry<T>>;
export function entries(...args: ReadonlyArray<unknown>): unknown {
  return curry(Object.entries, args);
}
