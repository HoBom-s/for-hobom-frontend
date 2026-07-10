import { StringSchema } from "./schemas/string-schema";
import { NumberSchema } from "./schemas/number-schema";
import { BooleanSchema } from "./schemas/boolean-schema";
import { DateSchema } from "./schemas/date-schema";
import { EnumSchema } from "./schemas/enum-schema";
import { ObjectSchema } from "./schemas/object-schema";
import { ArraySchema } from "./schemas/array-schema";
import type { Schema } from "./schemas/schema";

export const HoBomSchema = {
  string: (): StringSchema => new StringSchema(),
  number: (): NumberSchema => new NumberSchema(),
  boolean: (): BooleanSchema => new BooleanSchema(),
  date: (): DateSchema => new DateSchema(),
  enum: <T extends string>(values: readonly T[]): EnumSchema<T> => new EnumSchema(values),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: <T extends Record<string, Schema<any>>>(shape: T): ObjectSchema<T> =>
    new ObjectSchema(shape),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array: <T extends Schema<any>>(element: T): ArraySchema<T> => new ArraySchema(element),
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Infer<T extends Schema<any>> = T["_output"];

export { Schema } from "./schemas/schema";
export { SchemaError } from "./schemas/types";
export type { SafeParseResult, ValidationIssue } from "./schemas/types";
