import { useMutation, useDataLot } from "hobom-data";
import { dlqMutations, dlqQueries } from "@/entities/dlq";
import { useToast } from "@/shared/model";

export const useRetryDlq = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...dlqMutations.retry(),
    onSuccess: (data) => {
      openSuccessToast({
        message: data.items.message || "재시도 요청이 완료되었습니다.",
      });
      void dataLot.invalidateQueries({ queryKey: dlqQueries.all() });
    },
    onError: () => {
      openErrorToast({ message: "재시도 요청에 실패했습니다." });
    },
  });
};
