import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useRestoreTrashPage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.restoreTrash(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 복원했어요.",
    errorMessage: "페이지를 복원하지 못했어요.",
  });
