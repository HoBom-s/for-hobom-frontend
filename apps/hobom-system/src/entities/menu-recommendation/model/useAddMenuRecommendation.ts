import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { menuQueries } from "../api/menu-recommendation.queries";
import { menuMutations } from "../api/menu-recommendation.mutations";

export const useAddMenuRecommendation = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...menuMutations.addRecommendation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries(menuQueries.recommendationList());
      openSuccessToast({ message: "Successfully added menu recommendation" });
    },
    onError: () => {
      openErrorToast({ message: "Something went wrong !" });
    },
  });
};
