import { useEntityMutation } from "@/shared/model";
import { futureMessageMutations } from "../api/future-message.mutations";
import { futureMessageQueries } from "../api/future-message.queries";

export const useUpdateFutureMessage = () =>
  useEntityMutation({
    mutation: futureMessageMutations.update(),
    invalidateKeys: [futureMessageQueries.futureMessages()],
    successMessage: "메시지를 수정했어요.",
    errorMessage: "메시지를 수정하지 못했어요.",
  });
