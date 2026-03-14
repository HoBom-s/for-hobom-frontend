export type LazyResult<T> = LazyEmpty | LazyNext<T> | LazyMany<T>;

type LazyFn = (value: unknown, index: number, items: readonly unknown[]) => LazyResult<unknown>;

interface LazyMeta {
  readonly single?: boolean;
}

export interface LazyDefinition {
  readonly lazy: LazyMeta & ((...args: any) => LazyFn);
  readonly lazyArgs: readonly unknown[];
}

interface LazyEmpty {
  done: boolean;
  hasNext: false;
  hasMany?: false | undefined;
  next?: undefined;
}

interface LazyNext<T> {
  done: boolean;
  hasNext: true;
  hasMany?: false | undefined;
  next: T;
}

interface LazyMany<T> {
  done: boolean;
  hasNext: true;
  hasMany: true;
  next: readonly T[];
}
