import { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "hobom-data";
import { wikiSpaceQueries } from "@/entities/wiki-space";
import { useCreatePage } from "@/entities/wiki-page";

interface CreateDialogState {
  open: boolean;
  parentPageId: string | null;
  parentTitle?: string;
}

export const useWikiSpaceLayout = () => {
  const { spaceKey = "", pageId } = useParams<{
    spaceKey: string;
    pageId: string;
  }>();
  const navigate = useNavigate();
  const [createDialog, setCreateDialog] = useState<CreateDialogState>({
    open: false,
    parentPageId: null,
  });
  const createPage = useCreatePage();

  const { data } = useSuspenseQuery(wikiSpaceQueries.detail(spaceKey));
  const space = data.items;

  const handleNavigateToWiki = useCallback(() => {
    void navigate("/wiki");
  }, [navigate]);

  const handlePageSelect = useCallback(
    (selectedPageId: string) => {
      void navigate(`/wiki/${spaceKey}/pages/${selectedPageId}`);
    },
    [navigate, spaceKey],
  );

  const handleCreateChild = useCallback((parentId: string, parentTitle: string) => {
    setCreateDialog({ open: true, parentPageId: parentId, parentTitle });
  }, []);

  const handleCreatePage = (title: string) => {
    createPage.mutate(
      {
        spaceKey,
        title,
        content: "",
        parentPageId: createDialog.parentPageId,
      },
      {
        onSuccess: () => setCreateDialog({ open: false, parentPageId: null }),
      },
    );
  };

  const handleCloseDialog = () => {
    setCreateDialog({ open: false, parentPageId: null });
  };

  const handleOpenCreateDialog = useCallback(() => {
    setCreateDialog({ open: true, parentPageId: null });
  }, []);

  return {
    spaceKey,
    pageId,
    space,
    createDialog,
    handleNavigateToWiki,
    handlePageSelect,
    handleCreateChild,
    handleCreatePage,
    handleCloseDialog,
    handleOpenCreateDialog,
    isCreating: createPage.isPending,
  };
};
