import { useCallback, useMemo, useState, type ReactNode } from "react";
import { createSampleDocument, type StudioDocument } from "@/entities/document";
import type { FolderId, ItemId } from "@/entities/workspace";
import {
  addDesign,
  addFolder,
  itemsInFolder as itemsInFolderOp,
  renameFolder as renameFolderOp,
  renameItem as renameItemOp,
  setItemDocument as setItemDocumentOp,
  type WorkspaceState,
} from "../lib/workspace-ops.lib";
import { WorkspaceContext, type WorkspaceContextValue } from "./workspace-context";

const createInitialState = (): WorkspaceState => ({
  folders: [{ id: "f_default", name: "내 작업" }],
  items: [{ id: "i_sample", name: "샘플 폼", folderId: "f_default" }],
  documents: { i_sample: createSampleDocument() },
});

/** 워크스페이스 인메모리 store. 폴더·아이템·문서를 보관하고 ops를 제공한다. */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(createInitialState);

  const createFolder = useCallback((name: string) => {
    const id = `f_${crypto.randomUUID()}`;

    setState((prev) => addFolder(prev, { id, name }));

    return id;
  }, []);

  const createDesign = useCallback((folderId: FolderId, name: string) => {
    const id = `i_${crypto.randomUUID()}`;

    setState((prev) => addDesign(prev, { id, name, folderId }, { children: [] }));

    return id;
  }, []);

  const renameFolder = useCallback((id: FolderId, name: string) => {
    setState((prev) => renameFolderOp(prev, id, name));
  }, []);

  const renameItem = useCallback((id: ItemId, name: string) => {
    setState((prev) => renameItemOp(prev, id, name));
  }, []);

  const updateDocument = useCallback(
    (id: ItemId, updater: (prev: StudioDocument) => StudioDocument) => {
      setState((prev) => {
        const current = prev.documents[id];

        return current ? setItemDocumentOp(prev, id, updater(current)) : prev;
      });
    },
    [],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      folders: state.folders,
      items: state.items,
      itemsInFolder: (folderId) => itemsInFolderOp(state, folderId),
      getItem: (id) => state.items.find((item) => item.id === id),
      getDocument: (id) => state.documents[id],
      createFolder,
      createDesign,
      renameFolder,
      renameItem,
      updateDocument,
    }),
    [state, createFolder, createDesign, renameFolder, renameItem, updateDocument],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}
