import { useDataLot, useMutation } from "hobom-data";
import { volunteerPostMutations, volunteerPostQueries } from "@/entities/volunteer-post";
import { useToast } from "@/shared/model";

/** Write a review post, then refetch the feed so it shows at the top. */
export const useCreatePost = (onDone?: () => void) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...volunteerPostMutations.create(),
    onSuccess: () => {
      openSuccessToast({ message: "후기를 등록했어요." });
      void dataLot.invalidateQueries(volunteerPostQueries.feed());
      onDone?.();
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "등록에 실패했어요." }),
  });
};
