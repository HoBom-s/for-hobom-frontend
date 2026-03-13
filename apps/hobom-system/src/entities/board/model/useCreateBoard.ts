import { useEntityMutation } from "@/shared/model";
import { boardMutations } from "../api/board.mutations";
import { boardQueries } from "../api/board.queries";

export const useCreateBoard = () =>
  useEntityMutation({
    mutation: boardMutations.create(),
    invalidateKeys: [boardQueries.boards()],
    successMessage: "보드를 생성했어요.",
    errorMessage: "보드를 생성하지 못했어요.",
  });
