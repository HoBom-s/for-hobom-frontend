import { useEntityMutation } from "@/shared/model";
import { labelMutations } from "../api/label.mutations";
import { labelQueries } from "../api/label.queries";

export const useCreateLabel = () =>
  useEntityMutation({
    mutation: labelMutations.create(),
    invalidateKeys: [labelQueries.labels()],
    successMessage: "레이블을 생성했어요.",
    errorMessage: "레이블을 생성하지 못했어요.",
  });
