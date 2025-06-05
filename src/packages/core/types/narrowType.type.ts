import type { IsAny } from "type-fest";

export type NarrowedType<T, Base> =
  Extract<T, Base> extends never
    ? Base
    : IsAny<T> extends true
      ? Base
      : Extract<T, Base>;
