/**
 * Creates a function that negates the result of a predicate. Useful for inverting
 * type guards and boolean predicates in pipelines.
 *
 * @param predicate - The predicate to negate.
 * @returns A function that returns the logical negation of the predicate result.
 *
 * @example
 * pipe(users, filter(not(isNullish)))
 *
 * @category Function
 */
export function not<T>(predicate: (value: T) => boolean): (value: T) => boolean {
  return (value) => !predicate(value);
}

/**
 * Alias of `not`. Exported for compatibility.
 *
 * @category Function
 */
export { not as isNot };
