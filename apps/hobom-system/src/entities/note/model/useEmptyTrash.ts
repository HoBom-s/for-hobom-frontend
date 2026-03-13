import { useEntityMutation } from "@/shared/model";
import { noteMutations } from "../api/note.mutations";
import { noteQueries } from "../api/note.queries";

export const useEmptyTrash = () =>
  useEntityMutation({
    mutation: noteMutations.emptyTrash(),
    invalidateKeys: [noteQueries.notes()],
    successMessage: "휴지통을 비웠어요.",
    errorMessage: "휴지통을 비우지 못했어요.",
  });
