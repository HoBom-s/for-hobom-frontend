import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { wikiPageQueries } from "../api/wiki-page.queries";
import { wikiPageMutations } from "../api/wiki-page.mutations";

export const useRestorePageVersion = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...wikiPageMutations.restoreVersion(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: wikiPageQueries.pages(),
      });
      openSuccessToast({ message: "해당 버전으로 복원했어요." });
    },
    onError: (error) => {
      console.error(error);
      openErrorToast({ message: "버전을 복원하지 못했어요." });
    },
  });
};
