import { httpClient, parseResponse } from "@/shared/api";
import { pendingApprovalCountsSchema, pendingApprovalPageSchema } from "./approval.schema";
import type { ApprovalType, PendingApprovalCounts } from "../model/approval.model";
import type {
  DecideApprovalInput,
  PendingApprovalPage,
  RawPendingApprovalPage,
} from "./approval.type";

const PAGE_SIZE = 20;

const parsePage = parseResponse(pendingApprovalPageSchema, "GET /approvals/pending");
const parseCounts = parseResponse(pendingApprovalCountsSchema, "GET /approvals/pending/counts");

/** One cursor page of the operator's pending queue, optionally filtered by type. */
export const getPendingApprovals = (
  type: ApprovalType | undefined,
  cursor: string | undefined,
  signal?: AbortSignal,
): Promise<PendingApprovalPage> => {
  const query = new URLSearchParams({ limit: String(PAGE_SIZE) });

  if (type) query.set("type", type);
  if (cursor) query.set("cursor", cursor);

  return httpClient
    .get<RawPendingApprovalPage>(`/approvals/pending?${query.toString()}`, { signal })
    .then((page) => {
      // Advisory scalar check; the raw page is kept so `context` survives.
      parsePage(page);

      return {
        approvals: page.items,
        nextCursor: page.nextCursor,
        hasNext: page.hasNext,
      };
    });
};

/** Pending counts per type — the queue's tab badges. */
export const getPendingApprovalCounts = (signal?: AbortSignal): Promise<PendingApprovalCounts> =>
  httpClient
    .get<PendingApprovalCounts>("/approvals/pending/counts", { signal })
    .then(parseCounts);

/** Decide a pending request — approve or reject (reason required on a reject). */
export const decideApproval = (approvalId: string, input: DecideApprovalInput): Promise<void> =>
  httpClient.post(`/approvals/${approvalId}/decision`, input).then(() => undefined);
