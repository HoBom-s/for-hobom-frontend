type ExactlyFunction<T> =
  Extract<T, Function> extends never ? Function : Extract<T, Function>;

/**
 * A function that checks if the passed parameter is a Function.
 *
 * @param v - The variable to type check
 * @returns True if the passed parameter is a Function, false otherwise.
 *
 * @category Guard
 */
export function isFunction<T>(v: Function | T): v is ExactlyFunction<T> {
  return typeof v === "function";
}
