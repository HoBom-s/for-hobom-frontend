import { Schema } from "./schema";
import { fail } from "./types";
import type { Fail } from "./types";

/**
 * Validates an ISO-ish date string (anything `Date.parse` accepts) and keeps it
 * as a string, matching how the API carries dates over the wire.
 */
export class DateSchema extends Schema<string> {
  _parse(input: unknown): string | Fail {
    if (typeof input !== "string" || Number.isNaN(Date.parse(input))) {
      return fail([{ message: "Expected a date string" }]);
    }

    return input;
  }
}
