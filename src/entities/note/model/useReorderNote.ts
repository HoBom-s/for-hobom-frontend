import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteQueries } from "../api/note.queries";
import { noteMutations } from "../api/note.mutations";
import { patchReorderNote } from "../api/note.api";
import type { HttpResponseType } from "@/shared/api";
import type { NoteItemType } from "../api/note.type";
import type { NoteStatus } from "./note.model";

export const useReorderNote = (status?: NoteStatus) => {
  const queryClient = useQueryClient();
  const queryOption = noteQueries.list(status);

  return useMutation({
    mutationKey: noteMutations.reorder().mutationKey,
    mutationFn: ({
      id,
      order,
    }: {
      id: string;
      order: number;
      reorderedItems: NoteItemType[];
    }) => patchReorderNote({ id, order }),
    onMutate: async ({ reorderedItems }) => {
      await queryClient.cancelQueries(queryOption);
      const previous = queryClient.getQueryData<
        HttpResponseType<NoteItemType[]>
      >(queryOption.queryKey);

      queryClient.setQueryData<HttpResponseType<NoteItemType[]>>(
        queryOption.queryKey,
        (old) => {
          if (!old) return old;
          return { ...old, items: reorderedItems };
        },
      );

      return { previous };
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
