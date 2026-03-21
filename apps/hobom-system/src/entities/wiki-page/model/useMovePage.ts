import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useMovePage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.move(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 이동했어요.",
    errorMessage: "페이지를 이동하지 못했어요.",
  });
