import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useCopyPage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.copy(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 복사했어요.",
    errorMessage: "페이지를 복사하지 못했어요.",
  });
