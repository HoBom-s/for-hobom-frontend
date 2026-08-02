import { useDataLot, useMutation, useSuspenseInfiniteQuery } from "hobom-data";
import { approvalMutations, approvalQueries } from "@/entities/approval";
import { useToast } from "@/shared/model";
import type { ApprovalType, DecideApprovalInput } from "@/entities/approval";

/** §09 승인 큐 — one type's pending list (cursor-paged) plus the approve /
 *  reject decision, invalidating both the list and the tab-badge counts. */
export const usePendingApprovals = (type: ApprovalType) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const listOptions = approvalQueries.pending(type);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(listOptions);

  const approvals = data.pages.flatMap((page) => page.approvals);

  const decide = useMutation({
    ...approvalMutations.decide(),
    onSuccess: (_data, vars) => {
      openSuccessToast({
        message: vars.input.decision === "APPROVE" ? "승인했어요." : "반려했어요.",
      });
      void dataLot.invalidateQueries(listOptions);
      void dataLot.invalidateQueries(approvalQueries.counts());
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "처리에 실패했어요." }),
  });

  return {
    approvals,
    decide: (approvalId: string, input: DecideApprovalInput) =>
      decide.mutate({ approvalId, input }),
    deciding: decide.isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage: () => void fetchNextPage(),
  };
};
