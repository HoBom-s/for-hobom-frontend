import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...noteMutations.delete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: noteQueries.notes(),
      });
      openSuccessToast({ message: "노트를 삭제했어요." });
    },
    onError: () => {
      openErrorToast({ message: "노트를 삭제하지 못했어요." });
    },
  });
};
