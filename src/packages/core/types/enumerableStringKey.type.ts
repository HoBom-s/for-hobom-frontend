import type { EmptyObject } from "type-fest";

type ValuesOf<T> = T extends EmptyObject
  ? T[keyof T]
  : T extends Record<PropertyKey, infer V>
    ? V
    : never;

export type EnumerableStringKey<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never : T[K];
}>;
