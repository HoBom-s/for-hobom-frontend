import { curry } from "../curry/curry";

/**
 * Creates a new object by applying `fn` to each value of `data`, keeping keys unchanged.
 *
 * @param data - The source object.
 * @param fn - A function applied to each value.
 * @returns A new object with the same keys and transformed values.
 *
 * @dataLast
 *
 * @category Object
 */
export function mapValues<T extends object, U>(
  data: T,
  fn: (value: T[keyof T], key: keyof T & string, data: T) => U,
): Record<keyof T & string, U>;
export function mapValues<T extends object, U>(
  fn: (value: T[keyof T], key: keyof T & string, data: T) => U,
): (data: T) => Record<keyof T & string, U>;
export function mapValues(...args: ReadonlyArray<unknown>): unknown {
  return curry(mapValuesImpl, args);
}

function mapValuesImpl<T extends object, U>(
  data: T,
  fn: (value: T[keyof T], key: keyof T & string, data: T) => U,
): Record<keyof T & string, U> {
  const result = {} as Record<keyof T & string, U>;
  for (const key of Object.keys(data) as Array<keyof T & string>) {
    result[key] = fn(data[key as keyof T], key, data);
  }
  return result;
}
