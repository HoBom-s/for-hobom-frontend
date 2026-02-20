import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMenuRecommendationListQueryOption,
  postMenuRecommendation,
} from "@/entities/menu-recommendation";
import { useToast } from "@/shared/model";

export const useAddMenuRecommendation = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    mutationFn: postMenuRecommendation,
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        fetchMenuRecommendationListQueryOption(),
      );
      openSuccessToast({ message: "Successfully added menu recommendation" });
    },
    onError: () => {
      openErrorToast({ message: "Something went wrong !" });
    },
  });
};
