import { useEntityMutation } from "@/shared/model";
import { noteMutations } from "../api/note.mutations";
import { noteQueries } from "../api/note.queries";

export const useUpdateNote = () =>
  useEntityMutation({
    mutation: noteMutations.update(),
    invalidateKeys: [noteQueries.notes()],
    successMessage: "노트를 수정했어요.",
    errorMessage: "노트를 수정하지 못했어요.",
  });
