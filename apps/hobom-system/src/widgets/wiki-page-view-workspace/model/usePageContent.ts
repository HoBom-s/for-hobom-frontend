import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuspenseQueries } from "hobom-data";
import { wikiPageQueries, useDeletePage } from "@/entities/wiki-page";
import { userQueries } from "@/entities/user";

export const usePageContent = ({ spaceKey, pageId }: { spaceKey: string; pageId: string }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [{ data }, { data: user }] = useSuspenseQueries({
    queries: [wikiPageQueries.detail(spaceKey, pageId), userQueries.me()],
  });
  const page = data.items;
  const userInfo = user;
  const deletePage = useDeletePage();

  const handleDelete = () => {
    deletePage.mutate(
      { spaceKey, pageId },
      {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          navigate(`/wiki/${spaceKey}`);
        },
      },
    );
  };

  return {
    editing,
    setEditing,
    versionDrawerOpen,
    setVersionDrawerOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    page,
    userInfo,
    handleDelete,
    isDeleting: deletePage.isPending,
  };
};
