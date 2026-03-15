import { Schema } from "./schema";
import { fail } from "./types";
import type { Fail } from "./types";

export class EnumSchema<T extends string> extends Schema<T> {
  readonly #values: readonly T[];

  constructor(values: readonly T[]) {
    super();
    this.#values = [...values];
  }

  get options(): readonly T[] {
    return this.#values;
  }

  _parse(input: unknown): T | Fail {
    if (typeof input !== "string" || !this.#values.includes(input as T)) {
      return fail([{ message: `Expected one of: ${this.#values.join(", ")}` }]);
    }

    return input as T;
  }
}
