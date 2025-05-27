export function curryOn<T>(
  isArgs: (data: unknown) => data is T,
  impl: (data: unknown, ...args: T[]) => unknown,
  ...args: ReadonlyArray<unknown>
): unknown {
  if (args.length === 0) {
    throw new Error("No arguments passed to curryOn");
  }

  const firstArg = args[0];

  // data-first
  if (!isArgs(firstArg)) {
    const [data, ...maybeCases] = args;
    if (!maybeCases.every(isArgs)) {
      throw new Error("Invalid case arguments in data-first mode");
    }

    return impl(data, ...(maybeCases as T[]));
  }

  // curried
  return (data: unknown) => impl(data, ...(args as T[]));
}
