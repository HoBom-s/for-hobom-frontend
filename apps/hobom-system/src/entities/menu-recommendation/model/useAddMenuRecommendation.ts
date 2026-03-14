import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { menuQueries } from "../api/menu-recommendation.queries";
import { menuMutations } from "../api/menu-recommendation.mutations";

export const useAddMenuRecommendation = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...menuMutations.addRecommendation(),
    onSuccess: async () => {
      await dataLot.invalidateQueries(menuQueries.recommendationList());
      openSuccessToast({ message: "Successfully added menu recommendation" });
    },
    onError: () => {
      openErrorToast({ message: "Something went wrong !" });
    },
  });
};
