import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";
import type { NoteItemType } from "../api/note.type";
import type { NoteStatus } from "../model/note.model";

const STATUS_LABEL = {
  ACTIVE: "활성",
  ARCHIVED: "아카이브",
  TRASHED: "휴지통",
} as const;

export const useUpdateNoteStatus = (currentStatus?: NoteStatus) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const queryKey = currentStatus ? noteQueries.list(currentStatus).queryKey : undefined;

  return useMutation({
    ...noteMutations.updateStatus(),
    onMutate: async (variables) => {
      if (!queryKey) return;

      await dataLot.cancelQueries({ queryKey });
      const previousData = dataLot.getQueryData(queryKey);

      dataLot.setQueryData<{ items: NoteItemType[] }>(queryKey, (old) => {
        if (!old) return;

        return {
          ...old,
          items: old.items.filter((note) => note.id !== variables.id),
        };
      });

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (queryKey && context?.previousData != null) {
        dataLot.setQueryData(queryKey, context.previousData);
      }
      openErrorToast({ message: "노트 상태를 변경하지 못했어요." });
    },
    onSuccess: (_data, variables) => {
      const label = STATUS_LABEL[variables.status];

      openSuccessToast({ message: `노트를 ${label}(으)로 이동했어요.` });
    },
    onSettled: async () => {
      await dataLot.invalidateQueries({
        queryKey: noteQueries.notes(),
      });
    },
  });
};
