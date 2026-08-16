import { useDataLot, useMutation } from "hobom-data";
import { reviewMutations, reviewQueries } from "@/entities/review";
import { useToast } from "@/shared/model";
import type { ReviseReviewInput } from "@/entities/review";

/** Edit / delete the viewer's own reviews. A change invalidates the shelter's
 *  review list and reputation so the summary and cards refresh. */
export const useReviewActions = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const refresh = () => void dataLot.invalidateQueries({ queryKey: reviewQueries.all() });
  const onError = (error: Error) =>
    openErrorToast({ message: error.message || "처리에 실패했어요." });

  const revise = useMutation({
    ...reviewMutations.revise(),
    onSuccess: () => {
      openSuccessToast({ message: "후기를 수정했어요." });
      refresh();
    },
    onError,
  });

  const remove = useMutation({
    ...reviewMutations.remove(),
    onSuccess: () => {
      openSuccessToast({ message: "후기를 삭제했어요." });
      refresh();
    },
    onError,
  });

  return {
    revise: (reviewId: string, input: ReviseReviewInput) => revise.mutate({ reviewId, input }),
    revising: revise.isPending,
    remove: (reviewId: string) => remove.mutate(reviewId),
    removing: remove.isPending,
  };
};
