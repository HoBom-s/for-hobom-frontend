import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { adminUserQueries, adminUserMutations } from "@/entities/admin-user";

export const usePendingUserActions = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const approveMutation = useMutation({
    ...adminUserMutations.approve(),
    onSuccess: async () => {
      await dataLot.invalidateQueries(adminUserQueries.pending());
      openSuccessToast({ message: "사용자를 승인했어요." });
    },
    onError: () => openErrorToast({ message: "승인에 실패했어요." }),
  });

  const rejectMutation = useMutation({
    ...adminUserMutations.reject(),
    onSuccess: async () => {
      await dataLot.invalidateQueries(adminUserQueries.pending());
      openSuccessToast({ message: "사용자를 거절했어요." });
    },
    onError: () => openErrorToast({ message: "거절에 실패했어요." }),
  });

  return {
    approve: approveMutation.mutate,
    reject: rejectMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
};
