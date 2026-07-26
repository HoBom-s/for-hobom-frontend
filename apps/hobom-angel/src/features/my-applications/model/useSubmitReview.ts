import { useMutation } from "hobom-data";
import { reviewMutations } from "@/entities/review";
import { useToast } from "@/shared/model";
import type { SubmitReviewInput } from "@/entities/review";

/** Submit a shelter review for a completed placement, with toast feedback. */
export const useSubmitReview = (onDone: () => void) => {
  const { openSuccessToast, openErrorToast } = useToast();

  const mutation = useMutation({
    ...reviewMutations.submit(),
    onSuccess: () => {
      openSuccessToast({ message: "후기를 남겼어요. 감사합니다!" });
      onDone();
    },
    onError: (error: Error) =>
      openErrorToast({ message: error.message || "후기 등록에 실패했어요." }),
  });

  return {
    submit: (shelterId: string, input: SubmitReviewInput) =>
      mutation.mutate({ shelterId, input }),
    submitting: mutation.isPending,
  };
};
