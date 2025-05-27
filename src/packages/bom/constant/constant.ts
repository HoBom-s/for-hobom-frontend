/**
 * A function that takes any arguments and returns the provided `value` on every invocation..
 *
 * @param v - The constant value.
 *
 * @dataLast
 * @category Function
 */
export function constant<T>(
  v: T,
): <Args extends ReadonlyArray<unknown>>(...args: Args) => T {
  return () => v;
}
