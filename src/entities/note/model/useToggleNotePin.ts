import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";
import type { HttpResponseType } from "@/shared/api";
import type { NoteItemType } from "../api/note.type";
import type { NoteStatus } from "./note.model";

export const useToggleNotePin = (status?: NoteStatus) => {
  const queryClient = useQueryClient();
  const queryOption = noteQueries.list(status);
  const { openSuccessToast } = useToast();

  return useMutation({
    ...noteMutations.togglePin(),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(queryOption);
      const previous = queryClient.getQueryData<
        HttpResponseType<NoteItemType[]>
      >(queryOption.queryKey);

      const targetNote = previous?.items.find((n) => n.id === id);
      const wasPinned = targetNote?.isPinned ?? false;

      queryClient.setQueryData<HttpResponseType<NoteItemType[]>>(
        queryOption.queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((note) =>
              note.id === id ? { ...note, isPinned: !note.isPinned } : note,
            ),
          };
        },
      );

      return { previous, wasPinned };
    },
    onSuccess: (_data, _vars, context) => {
      openSuccessToast({
        message: context?.wasPinned
          ? "메모 고정을 해제했어요."
          : "메모를 고정했어요.",
      });
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryOption.queryKey, context.previous);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: noteQueries.notes(),
      });
    },
  });
};
