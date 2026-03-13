import { useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  noteQueries,
  useAddNoteMember,
  useRemoveNoteMember,
} from "@/entities/note";
import type { NoteItemType } from "@/entities/note";
import { userQueries, type UserType } from "@/entities/user";

interface UseNoteMemberShareParams {
  open: boolean;
  note: NoteItemType | null;
}

export const useNoteMemberShare = ({
  open,
  note,
}: UseNoteMemberShareParams) => {
  const isEdit = !!note;
  const addMember = useAddNoteMember();
  const removeMember = useRemoveNoteMember();

  const [{ data: meData }, { data: usersData }, { data: noteDetailData }] =
    useQueries({
      queries: [
        {
          ...userQueries.me(),
          enabled: open,
        },
        {
          ...userQueries.list(),
          enabled: open && isEdit,
        },
        {
          ...noteQueries.detail(note?.id ?? ""),
          enabled: open && isEdit,
        },
      ],
    });

  const liveMembers = noteDetailData?.items?.members ?? note?.members ?? [];

  const usersMap = useMemo(
    () => new Map((usersData?.items ?? []).map((u: UserType) => [u.id, u])),
    [usersData?.items],
  );
  const isOwner = !!note && meData?.id === note.owner;
  const noteMembers = useMemo(
    () =>
      liveMembers
        .map((id) => usersMap.get(id))
        .filter((u): u is UserType => !!u),
    [liveMembers, usersMap],
  );
  const memberIdSet = useMemo(() => new Set(liveMembers), [liveMembers]);
  const availableUsers = useMemo(
    () =>
      (usersData?.items ?? []).filter(
        (u: UserType) => !memberIdSet.has(u.id) && u.id !== note?.owner,
      ),
    [usersData?.items, memberIdSet, note?.owner],
  );

  const [memberAnchor, setMemberAnchor] = useState<HTMLElement | null>(null);

  const handleAddMember = (userId: string) => {
    if (!note) return;
    addMember.mutate({ noteId: note.id, userId });
  };

  const handleRemoveMember = (userId: string) => {
    if (!note) return;
    removeMember.mutate({ noteId: note.id, userId });
  };

  return {
    isOwner,
    noteMembers,
    availableUsers,
    memberAnchor,
    setMemberAnchor,
    handleAddMember,
    handleRemoveMember,
  };
};
