import { Schema } from "./schema";
import { fail, isFail } from "./types";
import type { Fail, ValidationIssue } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ArraySchema<T extends Schema<any>> extends Schema<T["_output"][]> {
  readonly #element: T;

  constructor(element: T) {
    super();
    this.#element = element;
  }

  _parse(input: unknown): T["_output"][] | Fail {
    if (!Array.isArray(input)) {
      return fail([{ message: "Expected array" }]);
    }

    const result: T["_output"][] = [];
    const issues: ValidationIssue[] = [];

    for (let i = 0; i < input.length; i++) {
      const parsed = this.#element._parse(input[i]);

      if (isFail(parsed)) {
        for (const issue of parsed.issues) {
          issues.push({ message: `[${i}]: ${issue.message}` });
        }
      } else {
        result.push(parsed);
      }
    }

    if (issues.length > 0) return fail(issues);

    return result;
  }
}
