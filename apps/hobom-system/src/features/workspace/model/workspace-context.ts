import { createContext, useContext } from "react";
import type { StudioDocument } from "@/entities/document";
import type { Folder, FolderId, ItemId, WorkspaceItem } from "@/entities/workspace";

export interface WorkspaceContextValue {
  folders: Folder[];
  items: WorkspaceItem[];
  itemsInFolder: (folderId: FolderId) => WorkspaceItem[];
  getItem: (id: ItemId) => WorkspaceItem | undefined;
  getDocument: (id: ItemId) => StudioDocument | undefined;
  createFolder: (name: string) => FolderId;
  createDesign: (folderId: FolderId, name: string) => ItemId;
  renameFolder: (id: FolderId, name: string) => void;
  renameItem: (id: ItemId, name: string) => void;
  deleteFolder: (id: FolderId) => void;
  deleteDesign: (id: ItemId) => void;
  updateDocument: (id: ItemId, updater: (prev: StudioDocument) => StudioDocument) => void;
}

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/** 워크스페이스 store 접근 훅. WorkspaceProvider 내부에서만 사용. */
export function useWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }

  return context;
}
