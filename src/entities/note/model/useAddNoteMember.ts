import { useEntityMutation } from "@/shared/model";
import { noteMutations } from "../api/note.mutations";
import { noteQueries } from "../api/note.queries";

export const useAddNoteMember = () =>
  useEntityMutation({
    mutation: noteMutations.addMember(),
    invalidateKeys: [noteQueries.notes()],
    successMessage: "멤버를 추가했어요.",
    errorMessage: "멤버를 추가하지 못했어요.",
  });
