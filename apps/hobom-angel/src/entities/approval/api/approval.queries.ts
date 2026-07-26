import { infiniteQueryOptions, queryOptions } from "hobom-data";
import { getPendingApprovalCounts, getPendingApprovals } from "./approval.api";
import type { ApprovalType } from "../model/approval.model";

export const approvalQueries = {
  all: () => ["approvals"] as const,

  pending: (type: ApprovalType) =>
    infiniteQueryOptions({
      queryKey: [...approvalQueries.all(), "pending", type] as const,
      queryFn: ({ pageParam, signal }) => getPendingApprovals(type, pageParam, signal),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
      initialPageParam: undefined as string | undefined,
    }),

  counts: () =>
    queryOptions({
      queryKey: [...approvalQueries.all(), "counts"] as const,
      queryFn: ({ signal }) => getPendingApprovalCounts(signal),
    }),
} as const;
