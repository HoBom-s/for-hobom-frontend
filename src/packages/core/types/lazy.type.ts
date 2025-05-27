export type LazyResult<T> = LazyEmpty | LazyNext<T> | LazyMany<T>;
type LazyFn = (
  value: unknown,
  index: number,
  items: ReadonlyArray<unknown>,
) => LazyResult<unknown>;
type LazyMeta = {
  readonly single?: boolean;
};

export type LazyDefinition = {
  readonly lazy: LazyMeta & ((...args: any) => LazyFn);
  readonly lazyArgs: ReadonlyArray<unknown>;
};

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
  next: ReadonlyArray<T>;
}
