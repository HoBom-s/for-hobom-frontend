import { useEntityMutation } from "@/shared/model";
import { wikiPageMutations } from "../api/wiki-page.mutations";
import { wikiPageQueries } from "../api/wiki-page.queries";

export const useCreatePage = () =>
  useEntityMutation({
    mutation: wikiPageMutations.create(),
    invalidateKeys: [wikiPageQueries.pages()],
    successMessage: "페이지를 생성했어요.",
    errorMessage: "페이지를 생성하지 못했어요.",
  });
