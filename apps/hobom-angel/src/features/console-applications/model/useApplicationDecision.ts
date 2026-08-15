import { useDataLot, useMutation } from "hobom-data";
import { applicationMutations, applicationQueries } from "@/entities/application";
import { useToast } from "@/shared/model";
import type { ApplicationKind } from "@/entities/application";

/** §7.2 심사 — approve or reject a pending application. A decision moves the row
 *  between status filters and flips its detail, so it invalidates the whole
 *  application cache for a fresh read. */
export const useApplicationDecision = (kind: ApplicationKind, id: string) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const decide = useMutation({
    ...applicationMutations.decide(),
    onSuccess: (_data, vars) => {
      openSuccessToast({
        message: vars.input.decision === "APPROVE" ? "신청을 승인했어요." : "신청을 반려했어요.",
      });
      void dataLot.invalidateQueries({ queryKey: applicationQueries.all() });
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "처리에 실패했어요." }),
  });

  return {
    approve: () => decide.mutate({ kind, id, input: { decision: "APPROVE" } }),
    reject: (reason: string) => decide.mutate({ kind, id, input: { decision: "REJECT", reason } }),
    deciding: decide.isPending,
  };
};
