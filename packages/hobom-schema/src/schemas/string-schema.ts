import { Schema } from "./schema";
import { fail } from "./types";
import type { Fail, ValidationIssue } from "./types";

interface StringRule {
  readonly validate: (value: string) => boolean;
  readonly message: string;
}

export class StringSchema extends Schema<string> {
  readonly #rules: readonly StringRule[];

  constructor(rules: readonly StringRule[] = []) {
    super();
    this.#rules = rules;
  }

  _parse(input: unknown): string | Fail {
    if (typeof input !== "string") {
      return fail([{ message: "Expected string" }]);
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

  min(n: number, message?: string): StringSchema {
    return new StringSchema([
      ...this.#rules,
      {
        validate: (v) => v.length >= n,
        message: message ?? `String must be at least ${n} characters`,
      },
    ]);
  }

  max(n: number, message?: string): StringSchema {
    return new StringSchema([
      ...this.#rules,
      {
        validate: (v) => v.length <= n,
        message: message ?? `String must be at most ${n} characters`,
      },
    ]);
  }

  regex(pattern: RegExp, message?: string): StringSchema {
    const safePattern = pattern.global
      ? new RegExp(pattern.source, pattern.flags.replace("g", ""))
      : pattern;

    return new StringSchema([
      ...this.#rules,
      {
        validate: (v) => safePattern.test(v),
        message: message ?? `String must match ${pattern}`,
      },
    ]);
  }
}
