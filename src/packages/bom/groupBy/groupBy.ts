import type { BoundedPartial } from "../../core/types/boundRecord.type";
import type { NonEmptyArray } from "../../core/types/iterable.type";
import { curry } from "../curry/curry.ts";

/**
 * Groups the element of a given iterable according to the string values
 * returned by provided callback.
 *
 * @param data - The values that would be iterated on.
 * @param cb - A function to execute for each element in the iterable.
 *
 * @dataFirst
 * @dataLast
 *
 * @category Array
 */
export function groupBy<T, Key extends PropertyKey = PropertyKey>(
  data: ReadonlyArray<T>,
  cb: (value: T, index: number, data: ReadonlyArray<T>) => Key | undefined,
): BoundedPartial<Record<Key, NonEmptyArray<T>>>;
export function groupBy<T, Key extends PropertyKey = PropertyKey>(
  cb: (value: T, index: number, data: ReadonlyArray<T>) => Key | undefined,
): (items: ReadonlyArray<T>) => BoundedPartial<Record<Key, NonEmptyArray<T>>>;
export function groupBy(...args: ReadonlyArray<unknown>): unknown {
  return curry(groupByImpl, args);
}

function groupByImpl<T, Key extends PropertyKey = PropertyKey>(
  data: ReadonlyArray<T>,
  cb: (value: T, index: number, data: ReadonlyArray<T>) => Key | undefined,
): BoundedPartial<Record<Key, NonEmptyArray<T>>> {
  const output: BoundedPartial<Record<Key, NonEmptyArray<T>>> =
    Object.create(null);

  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    const key = cb(item, index, data);
    if (key !== undefined) {
      const items = output[key];

      if (items === undefined) {
        // @ts-ignore
        output[key] = [item];
      } else {
        items.push(item);
      }
    }
  }

  Object.setPrototypeOf(output, Object.prototype);

  return output;
}
