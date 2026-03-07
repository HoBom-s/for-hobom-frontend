import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useRestorePageVersion = () =>
  useEntityMutation({
    mutation: wikiPageMutations.restoreVersion(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "해당 버전으로 복원했어요.",
    errorMessage: "버전을 복원하지 못했어요.",
  });
