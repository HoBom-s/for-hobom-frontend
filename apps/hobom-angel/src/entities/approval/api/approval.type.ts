import type { ApprovalDecision, ApprovalType, PendingApproval } from "../model/approval.model";

export interface RawPendingApproval {
  approvalId: string;
  type: ApprovalType;
  subjectRef: string;
  requesterId: string;
  context: Record<string, unknown> | null;
  createdAt: string | null;
}

/** The wire shape of one cursor page (envelope already unwrapped). */
export interface RawPendingApprovalPage {
  items: RawPendingApproval[];
  nextCursor: string | null;
  hasNext: boolean;
}

/** One cursor page of the pending queue, in domain shape. */
export interface PendingApprovalPage {
  approvals: PendingApproval[];
  nextCursor: string | null;
  hasNext: boolean;
}

/** `POST /approvals/:id/decision` request. `reason` is required on a reject. */
export interface DecideApprovalInput {
  decision: ApprovalDecision;
  reason?: string;
  metadata?: Record<string, unknown>;
}
