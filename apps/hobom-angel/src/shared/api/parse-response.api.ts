import { reportError } from "@/shared/lib/report-error.lib";
import type { Schema } from "hobom-schema";

/**
 * Boundary parser that validates a response payload against a schema.
 *
 * It never throws on a mismatch — it reports the contract violation via
 * `reportError` and passes the raw data through, so backend drift doesn't break
 * the screen. The logged mismatches guide bringing the schema/types in line
 * with the real contract over time (advisory validation).
 *
 * @param schema  the expected payload schema
 * @param context an identifier for the report message (e.g. `"GET /labels"`)
 */
export const parseResponse =
  <T>(schema: Schema<T>, context: string) =>
  (data: unknown): T => {
    const result = schema.safeParse(data);

    if (result.success) {
      return result.data;
    }

    const detail = result.error.issues.map((issue) => issue.message).join("; ");

    reportError(new Error(`Response validation mismatch (${context}): ${detail}`));

    // Advisory only: pass the unvalidated payload through so a schema/wire
    // mismatch is reported, not fatal.
    return data as T;
  };
