import type {
  KeysOfUnion,
  IsStringLiteral,
  IsNumericLiteral,
  IsSymbolLiteral,
  Split,
} from "type-fest";

type IsBoundedKey<T> = T extends unknown
  ? IsStringLiteral<T> extends true
    ? IsBoundedString<T>
    : IsNumericLiteral<T> extends true
      ? true
      : IsSymbolLiteral<T>
  : never;

type IsBoundedString<T> = T extends string
  ? Split<T, "">[number] extends infer U
    ? [`${number}`] extends [U]
      ? false
      : [string] extends [U]
        ? false
        : true
    : false
  : false;

export type BoundedRecord<
  T,
  TypeIfBoundedRecord = true,
  TypeIfUnboundedRecord = false,
> =
  IsBoundedKey<KeysOfUnion<T>> extends true
    ? TypeIfBoundedRecord
    : TypeIfUnboundedRecord;
