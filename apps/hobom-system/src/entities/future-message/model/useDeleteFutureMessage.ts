import { useEntityMutation } from "@/shared/model";
import { futureMessageMutations } from "../api/future-message.mutations";
import { futureMessageQueries } from "../api/future-message.queries";

export const useDeleteFutureMessage = () =>
  useEntityMutation({
    mutation: futureMessageMutations.delete(),
    invalidateKeys: [futureMessageQueries.futureMessages()],
    successMessage: "메시지를 삭제했어요.",
    errorMessage: "메시지를 삭제하지 못했어요.",
  });
