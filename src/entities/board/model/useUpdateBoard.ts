import { useEntityMutation } from "@/shared/model";
import { boardMutations } from "../api/board.mutations";
import { boardQueries } from "../api/board.queries";

export const useUpdateBoard = () =>
  useEntityMutation({
    mutation: boardMutations.update(),
    invalidateKeys: [boardQueries.boards()],
    successMessage: "보드를 수정했어요.",
    errorMessage: "보드를 수정하지 못했어요.",
  });
