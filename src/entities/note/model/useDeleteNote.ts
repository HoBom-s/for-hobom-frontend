import { useEntityMutation } from "@/shared/model";
import { noteMutations } from "../api/note.mutations";
import { noteQueries } from "../api/note.queries";

export const useDeleteNote = () =>
  useEntityMutation({
    mutation: noteMutations.delete(),
    invalidateKeys: [noteQueries.notes()],
    successMessage: "노트를 삭제했어요.",
    errorMessage: "노트를 삭제하지 못했어요.",
  });
