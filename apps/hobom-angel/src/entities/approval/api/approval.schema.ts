import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { PendingApprovalCounts } from "../model/approval.model";

const approvalType = HoBomSchema.enum([
  "SHELTER_VERIFICATION",
  "STAFF_PROMOTION",
  "ADOPTION",
  "FOSTER",
]);

// `context` is intentionally left out — it's a free-form, type-specific record
// the object schema can't carry, so the scalars are validated advisorily and
// `context` is read straight from the raw payload.
const pendingApprovalSchema = HoBomSchema.object({
  approvalId: HoBomSchema.string(),
  type: approvalType,
  subjectRef: HoBomSchema.string(),
  requesterId: HoBomSchema.string(),
  createdAt: HoBomSchema.string().nullable(),
});

/** `GET /approvals/pending` — one cursor page (scalars only; advisory). */
export const pendingApprovalPageSchema = HoBomSchema.object({
  items: HoBomSchema.array(pendingApprovalSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `GET /approvals/pending/counts` — per-type badges. */
export const pendingApprovalCountsSchema: Schema<PendingApprovalCounts> = HoBomSchema.object({
  SHELTER_VERIFICATION: HoBomSchema.number(),
  STAFF_PROMOTION: HoBomSchema.number(),
  ADOPTION: HoBomSchema.number(),
  FOSTER: HoBomSchema.number(),
});
