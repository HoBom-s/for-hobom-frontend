import { Schema } from "./schema";
import { fail } from "./types";
import type { Fail } from "./types";

export class BooleanSchema extends Schema<boolean> {
  _parse(input: unknown): boolean | Fail {
    if (typeof input !== "boolean") {
      return fail([{ message: "Expected boolean" }]);
    }

    return input;
  }
}
