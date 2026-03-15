import { Schema } from "./schema";
import { fail } from "./types";
import type { Fail, ValidationIssue } from "./types";

interface NumberRule {
  readonly validate: (value: number) => boolean;
  readonly message: string;
}

export class NumberSchema extends Schema<number> {
  readonly #rules: readonly NumberRule[];

  constructor(rules: readonly NumberRule[] = []) {
    super();
    this.#rules = rules;
  }

  _parse(input: unknown): number | Fail {
    if (typeof input !== "number" || !Number.isFinite(input)) {
      return fail([{ message: "Expected number" }]);
    }

    const issues: ValidationIssue[] = [];

    for (const rule of this.#rules) {
      if (!rule.validate(input)) {
        issues.push({ message: rule.message });
      }
    }

    if (issues.length > 0) return fail(issues);

    return input;
  }

  positive(message?: string): NumberSchema {
    return new NumberSchema([
      ...this.#rules,
      {
        validate: (v) => v > 0,
        message: message ?? "Number must be positive",
      },
    ]);
  }

  min(n: number, message?: string): NumberSchema {
    return new NumberSchema([
      ...this.#rules,
      {
        validate: (v) => v >= n,
        message: message ?? `Number must be at least ${n}`,
      },
    ]);
  }

  max(n: number, message?: string): NumberSchema {
    return new NumberSchema([
      ...this.#rules,
      {
        validate: (v) => v <= n,
        message: message ?? `Number must be at most ${n}`,
      },
    ]);
  }
}
