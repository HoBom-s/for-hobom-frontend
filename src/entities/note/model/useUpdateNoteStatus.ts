import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";

const STATUS_LABEL = {
  ACTIVE: "활성",
  ARCHIVED: "아카이브",
  TRASHED: "휴지통",
} as const;

export const useUpdateNoteStatus = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...noteMutations.updateStatus(),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: noteQueries.notes(),
      });
      const label = STATUS_LABEL[variables.status];
      openSuccessToast({ message: `노트를 ${label}(으)로 이동했어요.` });
    },
    onError: () => {
      openErrorToast({ message: "노트 상태를 변경하지 못했어요." });
    },
  });
};
