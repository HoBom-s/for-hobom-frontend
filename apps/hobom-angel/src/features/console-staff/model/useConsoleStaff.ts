import { useMutation, useSuspenseQuery } from "hobom-data";
import { shelterMutations, shelterQueries } from "@/entities/shelter";
import { useToast } from "@/shared/model";
import { sortRoster } from "../lib/staff.lib";

/** §7.6 스태프 관리 — the shelter's roster plus opening a promotion request. */
export const useConsoleStaff = (shelterId: string) => {
  const { openSuccessToast, openErrorToast } = useToast();

  const { data } = useSuspenseQuery(shelterQueries.staff(shelterId));

  const promote = useMutation({
    ...shelterMutations.promoteStaff(shelterId),
    onSuccess: () =>
      openSuccessToast({ message: "승격 요청을 보냈어요. 대표 승인 후 스태프로 등록돼요." }),
    onError: (error: Error) =>
      openErrorToast({ message: error.message || "승격 요청에 실패했어요." }),
  });

  return {
    members: sortRoster(data),
    requestPromotion: (candidateUserId: string) => promote.mutate(candidateUserId),
    promoting: promote.isPending,
  };
};
