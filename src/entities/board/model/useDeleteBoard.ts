import { useEntityMutation } from "@/shared/model";
import { boardMutations } from "../api/board.mutations";
import { boardQueries } from "../api/board.queries";

export const useDeleteBoard = () =>
  useEntityMutation({
    mutation: boardMutations.delete(),
    invalidateKeys: [boardQueries.boards()],
    successMessage: "보드를 삭제했어요.",
    errorMessage: "보드를 삭제하지 못했어요.",
  });
