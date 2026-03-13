import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useDeletePage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.delete(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 삭제했어요.",
    errorMessage: "페이지를 삭제하지 못했어요.",
  });
