/** The kinds of decision the operator approval queue handles (§09). */
export type ApprovalType = "SHELTER_VERIFICATION" | "STAFF_PROMOTION" | "ADOPTION" | "FOSTER";

/** The operator's verdict on a pending request. */
export type ApprovalDecision = "APPROVE" | "REJECT";

/**
 * One pending request in the operator queue. Type-agnostic: `subjectRef` is the
 * target entity id and `context` the submit-time payload, both type-specific.
 * Feed `approvalId` to the decision endpoint.
 */
export interface PendingApproval {
  approvalId: string;
  type: ApprovalType;
  subjectRef: string;
  requesterId: string;
  context: Record<string, unknown> | null;
  createdAt: string | null;
}

/** Pending counts per type — the queue's tab badges. */
export type PendingApprovalCounts = Record<ApprovalType, number>;

export const APPROVAL_TYPE_LABEL: Record<ApprovalType, string> = {
  SHELTER_VERIFICATION: "보호소 검증",
  STAFF_PROMOTION: "스태프 승격",
  ADOPTION: "입양",
  FOSTER: "임보",
};
