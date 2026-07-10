import { Schema } from "./schema";
import { fail, isFail } from "./types";
import type { Fail, ValidationIssue } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferShape<T extends Record<string, Schema<any>>> = {
  [K in keyof T]: T[K]["_output"];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ObjectSchema<T extends Record<string, Schema<any>>> extends Schema<InferShape<T>> {
  readonly #shape: T;

  constructor(shape: T) {
    super();
    this.#shape = shape;
  }

  _parse(input: unknown): InferShape<T> | Fail {
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
      return fail([{ message: "Expected object" }]);
    }

    const record = input as Record<string, unknown>;
    const result = Object.create(null) as Record<string, unknown>;
    const issues: ValidationIssue[] = [];

    for (const [key, schema] of Object.entries(this.#shape)) {
      const parsed = schema._parse(record[key]);

      if (isFail(parsed)) {
        for (const issue of parsed.issues) {
          issues.push({ message: `${key}: ${issue.message}` });
        }
      } else {
        result[key] = parsed;
      }
    }

    if (issues.length > 0) return fail(issues);

    return result as InferShape<T>;
  }
}
