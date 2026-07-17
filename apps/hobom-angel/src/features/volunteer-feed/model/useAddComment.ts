import { useDataLot, useMutation } from "hobom-data";
import { volunteerPostMutations, volunteerPostQueries } from "@/entities/volunteer-post";
import { useToast } from "@/shared/model";

/** Post a comment, then refresh the thread and the feed's comment count. */
export const useAddComment = (postId: string) => {
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();

  return useMutation({
    ...volunteerPostMutations.addComment(postId),
    onSuccess: () => {
      void dataLot.invalidateQueries(volunteerPostQueries.comments(postId));
      void dataLot.invalidateQueries(volunteerPostQueries.feed());
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "댓글 등록에 실패했어요." }),
  });
};
