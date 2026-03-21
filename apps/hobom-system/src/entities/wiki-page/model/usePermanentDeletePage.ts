import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const usePermanentDeletePage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.permanentDelete(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 영구 삭제했어요.",
    errorMessage: "페이지를 영구 삭제하지 못했어요.",
  });
