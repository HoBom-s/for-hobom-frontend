export type Iterable<T = unknown> = ReadonlyArray<T> | readonly [];

export type Mappable<T extends Iterable, K> = {
  // Remove readonly property.
  -readonly [P in keyof T]: K;
};
