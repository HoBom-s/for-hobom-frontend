import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { wikiSpaceQueries } from "../api/wiki-space.queries";
import { wikiSpaceMutations } from "../api/wiki-space.mutations";

export const useCreateSpace = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...wikiSpaceMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: wikiSpaceQueries.spaces(),
      });
      openSuccessToast({ message: "스페이스를 생성했어요." });
    },
    onError: (error) => {
      console.error(error);
      openErrorToast({ message: "스페이스를 생성하지 못했어요." });
    },
  });
};
