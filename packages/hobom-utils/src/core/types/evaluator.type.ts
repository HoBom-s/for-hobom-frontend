import type { LazyResult } from "./lazy.type";

export type Evaluator<T = unknown, R = T> = (
  item: T,
  index: number,
  data: readonly T[],
) => LazyResult<R>;
