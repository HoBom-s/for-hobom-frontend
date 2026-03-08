import { useEntityMutation } from "@/shared/model";
import { noteMutations } from "../api/note.mutations";
import { noteQueries } from "../api/note.queries";

export const useRemoveNoteMember = () =>
  useEntityMutation({
    mutation: noteMutations.removeMember(),
    invalidateKeys: [noteQueries.notes()],
    successMessage: "멤버를 제거했어요.",
    errorMessage: "멤버를 제거하지 못했어요.",
  });
