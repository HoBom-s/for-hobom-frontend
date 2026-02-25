import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...noteMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: noteQueries.notes(),
      });
      openSuccessToast({ message: "노트를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "노트를 생성하지 못했어요." });
    },
  });
};
