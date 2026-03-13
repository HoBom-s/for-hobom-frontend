import { curry } from "../curry/curry";
import type { Iterable } from "../../core/types/iterable.type";
import type { EnumerableStringKey } from "../../core/types/enumerableStringKey.type";

type Values<T extends object> =
  T extends Iterable<T> ? T[number][] : EnumerableStringKey<T>[];

/**
 * Extract values from passed parameter.
 *
 * @param v - The value.
 *
 * @Category Object
 */
export function values<T extends object>(v: T): Values<T>;
export function values(): <T extends object>(v: T) => Values<T>;
export function values(...args: readonly unknown[]): unknown {
  return curry(Object.values, args);
}
