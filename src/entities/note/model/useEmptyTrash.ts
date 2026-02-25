import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";

export const useEmptyTrash = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...noteMutations.emptyTrash(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: noteQueries.notes(),
      });
      openSuccessToast({ message: "휴지통을 비웠어요." });
    },
    onError: () => {
      openErrorToast({ message: "휴지통을 비우지 못했어요." });
    },
  });
};
