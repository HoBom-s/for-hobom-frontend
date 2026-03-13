import { useEntityMutation } from "@/shared/model";
import { noteMutations } from "../api/note.mutations";
import { noteQueries } from "../api/note.queries";

export const useCreateNote = () =>
  useEntityMutation({
    mutation: noteMutations.create(),
    invalidateKeys: [noteQueries.notes()],
    successMessage: "노트를 생성했어요.",
    errorMessage: "노트를 생성하지 못했어요.",
  });
