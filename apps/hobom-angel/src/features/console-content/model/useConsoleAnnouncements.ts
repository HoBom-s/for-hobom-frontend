import { useState } from "react";
import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { shelterMutations, shelterQueries } from "@/entities/shelter";
import { useToast } from "@/shared/model";
import type { AnnouncementInput, ShelterAnnouncement } from "@/entities/shelter";

/** The console's announcement CMS for a shelter (§7.4): the list plus create /
 *  edit / delete, invalidating the list so a change shows immediately. Tracks
 *  which announcement is being edited (null = a new post). */
export const useConsoleAnnouncements = (shelterId: string) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();
  const [editing, setEditing] = useState<ShelterAnnouncement | null>(null);

  const listOptions = shelterQueries.announcements(shelterId);
  const { data: announcements } = useSuspenseQuery(listOptions);

  const settle = (message: string) => {
    openSuccessToast({ message });
    void dataLot.invalidateQueries(listOptions);
    setEditing(null);
  };
  const onError = (error: Error) => openErrorToast({ message: error.message || "저장에 실패했어요." });

  const create = useMutation({
    ...shelterMutations.createAnnouncement(shelterId),
    onSuccess: () => settle("공지를 게시했어요."),
    onError,
  });
  const update = useMutation({
    ...shelterMutations.updateAnnouncement(),
    onSuccess: () => settle("공지를 수정했어요."),
    onError,
  });
  const remove = useMutation({
    ...shelterMutations.removeAnnouncement(),
    onSuccess: () => settle("공지를 삭제했어요."),
    onError,
  });

  return {
    announcements,
    editing,
    edit: setEditing,
    clearEdit: () => setEditing(null),
    createAnnouncement: (input: AnnouncementInput) => create.mutate(input),
    updateAnnouncement: (input: AnnouncementInput) => {
      if (editing) update.mutate({ id: editing.id, input });
    },
    removeAnnouncement: (id: string) => remove.mutate(id),
    saving: create.isPending || update.isPending,
  };
};
