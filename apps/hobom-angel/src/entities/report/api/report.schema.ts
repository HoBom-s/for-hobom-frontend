import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawReport } from "./report.type";

/** `GET /reports/pending` — the operator's moderation queue (bare array). */
export const pendingReportsSchema: Schema<RawReport[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    reporterId: HoBomSchema.string(),
    targetType: HoBomSchema.enum(["ANIMAL", "SHELTER", "USER"]),
    targetRef: HoBomSchema.string(),
    reason: HoBomSchema.enum([
      "ANIMAL_ABUSE",
      "FAKE_SHELTER",
      "INAPPROPRIATE_CONTENT",
      "USER_MISCONDUCT",
      "OTHER",
    ]),
    detail: HoBomSchema.string(),
    status: HoBomSchema.enum(["PENDING", "RESOLVED"]),
    resolution: HoBomSchema.enum(["DISMISSED", "UPHELD"]).nullable(),
    resolvedAt: HoBomSchema.string().nullable(),
  }),
);
