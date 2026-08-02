import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { mockSession } from "./mock-session";
import { ok } from "./ok";

type ApprovalType = "SHELTER_VERIFICATION" | "STAFF_PROMOTION" | "ADOPTION" | "FOSTER";

interface PendingApprovalRow {
  approvalId: string;
  type: ApprovalType;
  subjectRef: string;
  requesterId: string;
  context: Record<string, unknown> | null;
  createdAt: string;
}

// The operator's global pending queue. Mutable so a decision drops the row and
// the counts fall on the next read. Shared with the decision handler in
// shelter.handlers so approving/rejecting here clears the item.
export const PENDING_APPROVALS: PendingApprovalRow[] = [
  {
    approvalId: "ap-verif-1",
    type: "SHELTER_VERIFICATION",
    subjectRef: "shelter-9",
    requesterId: "user-31",
    context: null,
    createdAt: "2026-07-24T09:00:00.000Z",
  },
  {
    approvalId: "ap-verif-2",
    type: "SHELTER_VERIFICATION",
    subjectRef: "shelter-12",
    requesterId: "user-44",
    context: null,
    createdAt: "2026-07-25T02:30:00.000Z",
  },
  {
    approvalId: "ap-promo-1",
    type: "STAFF_PROMOTION",
    subjectRef: "user-58",
    requesterId: "user-2",
    context: { shelterId: "shelter-1" },
    createdAt: "2026-07-25T05:10:00.000Z",
  },
  {
    approvalId: "ap-adopt-1",
    type: "ADOPTION",
    subjectRef: "adoption-77",
    requesterId: "user-63",
    context: { animalId: "animal-21" },
    createdAt: "2026-07-25T08:45:00.000Z",
  },
  {
    approvalId: "ap-foster-1",
    type: "FOSTER",
    subjectRef: "foster-88",
    requesterId: "user-70",
    context: { animalId: "animal-34" },
    createdAt: "2026-07-26T01:20:00.000Z",
  },
];

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

/** Operator approval-queue mock — the pending list and its per-type counts. */
export const approvalHandlers = [
  http.get(mockUrl("/approvals/pending/counts"), () => {
    if (!mockSession.isActive()) return unauthorized();

    const counts: Record<ApprovalType, number> = {
      SHELTER_VERIFICATION: 0,
      STAFF_PROMOTION: 0,
      ADOPTION: 0,
      FOSTER: 0,
    };

    for (const row of PENDING_APPROVALS) counts[row.type] += 1;

    return ok(counts);
  }),

  http.get(mockUrl("/approvals/pending"), ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const type = new URL(request.url).searchParams.get("type") as ApprovalType | null;
    const items = type ? PENDING_APPROVALS.filter((row) => row.type === type) : PENDING_APPROVALS;

    return ok({ items, nextCursor: null, hasNext: false });
  }),
];
