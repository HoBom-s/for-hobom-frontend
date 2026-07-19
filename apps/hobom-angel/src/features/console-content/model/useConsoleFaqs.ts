import { useState } from "react";
import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { shelterMutations, shelterQueries } from "@/entities/shelter";
import { useToast } from "@/shared/model";
import type { ShelterFaq } from "@/entities/shelter";

/** FAQ text (order is assigned by the hook, not the form). */
export interface FaqDraft {
  question: string;
  answer: string;
}

/** The console's FAQ CMS for a shelter (§7.4): the list plus create / edit /
 *  delete. New entries append to the end; edits keep their order. */
export const useConsoleFaqs = (shelterId: string) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();
  const [editing, setEditing] = useState<ShelterFaq | null>(null);

  const listOptions = shelterQueries.faqs(shelterId);
  const { data: faqs } = useSuspenseQuery(listOptions);

  const settle = (message: string) => {
    openSuccessToast({ message });
    void dataLot.invalidateQueries(listOptions);
    setEditing(null);
  };
  const onError = (error: Error) => openErrorToast({ message: error.message || "저장에 실패했어요." });

  const create = useMutation({
    ...shelterMutations.createFaq(shelterId),
    onSuccess: () => settle("FAQ를 추가했어요."),
    onError,
  });
  const update = useMutation({
    ...shelterMutations.updateFaq(),
    onSuccess: () => settle("FAQ를 수정했어요."),
    onError,
  });
  const remove = useMutation({
    ...shelterMutations.removeFaq(),
    onSuccess: () => settle("FAQ를 삭제했어요."),
    onError,
  });

  return {
    faqs,
    editing,
    edit: setEditing,
    clearEdit: () => setEditing(null),
    createFaq: (draft: FaqDraft) => create.mutate({ ...draft, order: faqs.length }),
    updateFaq: (draft: FaqDraft) => {
      if (editing) update.mutate({ id: editing.id, input: { ...draft, order: editing.order } });
    },
    removeFaq: (id: string) => remove.mutate(id),
    saving: create.isPending || update.isPending,
  };
};
