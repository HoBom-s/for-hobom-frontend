import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuspenseQueries } from "hobom-data";
import { wikiPageQueries, useDeletePage, useMovePage, useCopyPage } from "@/entities/wiki-page";
import { userQueries } from "@/entities/user";

export const usePageContent = ({ spaceKey, pageId }: { spaceKey: string; pageId: string }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [versionDrawerOpen, setVersionDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);

  const [{ data }, { data: user }] = useSuspenseQueries({
    queries: [wikiPageQueries.detail(spaceKey, pageId), userQueries.me()],
  });
  const page = data.items;
  const userInfo = user;
  const deletePage = useDeletePage();
  const movePage = useMovePage();
  const copyPage = useCopyPage();

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

  const handleMove = (targetSpaceKey: string, parentPageId: string | null) => {
    movePage.mutate(
      { spaceKey, pageId, targetSpaceKey, parentPageId },
      {
        onSuccess: () => {
          setMoveDialogOpen(false);
          navigate(`/wiki/${targetSpaceKey}`);
        },
      },
    );
  };

  const handleCopy = (targetSpaceKey: string, parentPageId: string | null) => {
    copyPage.mutate(
      { spaceKey, pageId, targetSpaceKey, parentPageId },
      { onSuccess: () => setCopyDialogOpen(false) },
    );
  };

  return {
    editing,
    setEditing,
    versionDrawerOpen,
    setVersionDrawerOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    moveDialogOpen,
    setMoveDialogOpen,
    copyDialogOpen,
    setCopyDialogOpen,
    page,
    userInfo,
    handleDelete,
    handleMove,
    handleCopy,
    isDeleting: deletePage.isPending,
    isMoving: movePage.isPending,
    isCopying: copyPage.isPending,
  };
};
