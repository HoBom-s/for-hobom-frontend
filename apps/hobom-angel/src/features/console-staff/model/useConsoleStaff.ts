import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { shelterMutations, shelterQueries } from "@/entities/shelter";
import { useToast } from "@/shared/model";
import { sortRoster } from "../lib/staff.lib";

/** §7.6 스태프 관리 — the roster plus the pending 승격 요청 queue and its
 *  approve / reject decisions (the shelter representative decides). */
export const useConsoleStaff = (shelterId: string) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const rosterOptions = shelterQueries.staff(shelterId);
  const queueOptions = shelterQueries.staffPromotions(shelterId);
  const { data: roster } = useSuspenseQuery(rosterOptions);
  const { data: pending } = useSuspenseQuery(queueOptions);

  const decide = useMutation({
    ...shelterMutations.decidePromotion(),
    onSuccess: (_data, vars) => {
      openSuccessToast({
        message: vars.input.decision === "APPROVE" ? "스태프로 승인했어요." : "승격 요청을 반려했어요.",
      });
      void dataLot.invalidateQueries(queueOptions);
      void dataLot.invalidateQueries(rosterOptions);
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "처리에 실패했어요." }),
  });

  return {
    members: sortRoster(roster),
    pending,
    approve: (approvalId: string) => decide.mutate({ approvalId, input: { decision: "APPROVE" } }),
    reject: (approvalId: string, reason: string) =>
      decide.mutate({ approvalId, input: { decision: "REJECT", reason } }),
    deciding: decide.isPending,
  };
};
