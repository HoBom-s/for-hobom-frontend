/**
 * Check the passed parameters result is negates it.
 *
 * @param pred - The guard function to negate.
 *
 * @dataLast
 *
 * @category Guard
 */
export function isNot<T>(pred: (v: T) => boolean): (data: T) => boolean;
export function isNot<T>(pred: (data: T) => boolean) {
  return (data: T): boolean => !pred(data);
}
