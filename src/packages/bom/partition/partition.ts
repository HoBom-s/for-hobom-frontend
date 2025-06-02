import { curry } from "../curry/curry.ts";

/**
 * Splits a collection into two groups, the first of which contains elements the `predicate`
 * type guard passes, and the second one containing the rest.
 *
 * @param data - The parameter to split.
 * @param predicate - A function to execute for each element in the array.
 *
 * @dataFirst
 * @dataLast
 *
 * @category Array
 */
export function partition<TOrigin, TTrueData extends TOrigin>(
  data: ReadonlyArray<TOrigin>,
  predicate: (
    value: TOrigin,
    index: number,
    data: ReadonlyArray<TOrigin>,
  ) => value is TTrueData,
): [Array<TTrueData>, Array<Exclude<TOrigin, TTrueData>>];
export function partition<TOrigin>(
  data: ReadonlyArray<TOrigin>,
  predicate: (
    value: TOrigin,
    index: number,
    data: ReadonlyArray<TOrigin>,
  ) => boolean,
): [Array<TOrigin>, Array<TOrigin>];
export function partition<TOrigin, TTrueData extends TOrigin>(
  predicate: (
    value: TOrigin,
    index: number,
    data: ReadonlyArray<TOrigin>,
  ) => value is TTrueData,
): (
  data: ReadonlyArray<TOrigin>,
) => [Array<TTrueData>, Array<Exclude<TOrigin, TTrueData>>];
export function partition<TOrigin>(
  predicate: (
    value: TOrigin,
    index: number,
    data: ReadonlyArray<TOrigin>,
  ) => boolean,
): (data: ReadonlyArray<TOrigin>) => [Array<TOrigin>, Array<TOrigin>];
export function partition(...args: ReadonlyArray<unknown>): unknown {
  return curry(partitionImpl, args);
}

function partitionImpl<TOrigin, TTrueData extends TOrigin>(
  data: ReadonlyArray<TOrigin>,
  pred: (
    value: TOrigin,
    index: number,
    data: ReadonlyArray<TOrigin>,
  ) => value is TTrueData,
): [Array<TTrueData>, Array<TOrigin>] {
  const result: [Array<TTrueData>, Array<TOrigin>] = [[], []];

  for (const [idx, item] of data.entries()) {
    if (pred(item, idx, data)) {
      result[0].push(item);
    } else {
      result[1].push(item);
    }
  }

  return result;
}
