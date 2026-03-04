import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { wikiPageQueries } from "../api/wiki-page.queries";
import { wikiPageMutations } from "../api/wiki-page.mutations";

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...wikiPageMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: wikiPageQueries.pages(),
      });
      openSuccessToast({ message: "페이지를 생성했어요." });
    },
    onError: (error) => {
      console.error(error);
      openErrorToast({ message: "페이지를 생성하지 못했어요." });
    },
  });
};
