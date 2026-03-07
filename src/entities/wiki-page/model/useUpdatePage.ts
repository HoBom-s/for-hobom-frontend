import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useUpdatePage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.update(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 저장했어요.",
    errorMessage: "페이지를 저장하지 못했어요.",
  });
