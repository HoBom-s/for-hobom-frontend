import type { Folder, FolderId, ItemId, WorkspaceItem } from "@/entities/workspace";
import type { StudioDocument } from "@/entities/document";

/** 워크스페이스 인메모리 상태 — 폴더·아이템 메타 + 아이템별 문서. */
export interface WorkspaceState {
  folders: Folder[];
  items: WorkspaceItem[];
  documents: Record<ItemId, StudioDocument>;
}

/** 폴더를 추가한 새 상태를 반환한다(불변). */
export const addFolder = (state: WorkspaceState, folder: Folder): WorkspaceState => ({
  ...state,
  folders: [...state.folders, folder],
});

/** 아이템(메타 + 문서)을 추가한 새 상태를 반환한다(불변). */
export const addDesign = (
  state: WorkspaceState,
  item: WorkspaceItem,
  document: StudioDocument,
): WorkspaceState => ({
  ...state,
  items: [...state.items, item],
  documents: { ...state.documents, [item.id]: document },
});

/** 아이템의 문서를 교체한 새 상태를 반환한다(불변). */
export const setItemDocument = (
  state: WorkspaceState,
  itemId: ItemId,
  document: StudioDocument,
): WorkspaceState => ({
  ...state,
  documents: { ...state.documents, [itemId]: document },
});

/** 폴더에 속한 아이템 목록. */
export const itemsInFolder = (state: WorkspaceState, folderId: FolderId): WorkspaceItem[] =>
  state.items.filter((item) => item.folderId === folderId);

/** 폴더 이름을 바꾼 새 상태를 반환한다(불변). */
export const renameFolder = (
  state: WorkspaceState,
  folderId: FolderId,
  name: string,
): WorkspaceState => ({
  ...state,
  folders: state.folders.map((folder) => (folder.id === folderId ? { ...folder, name } : folder)),
});

/** 아이템 이름을 바꾼 새 상태를 반환한다(불변). */
export const renameItem = (state: WorkspaceState, itemId: ItemId, name: string): WorkspaceState => ({
  ...state,
  items: state.items.map((item) => (item.id === itemId ? { ...item, name } : item)),
});

/** 아이템과 그 문서를 제거한 새 상태를 반환한다(불변). */
export const removeDesign = (state: WorkspaceState, itemId: ItemId): WorkspaceState => {
  const { [itemId]: _removed, ...documents } = state.documents;

  return {
    ...state,
    items: state.items.filter((item) => item.id !== itemId),
    documents,
  };
};

/** 폴더와 그 안의 아이템·문서를 모두 제거한 새 상태를 반환한다(불변, cascade). */
export const removeFolder = (state: WorkspaceState, folderId: FolderId): WorkspaceState => {
  const keptItems = state.items.filter((item) => item.folderId !== folderId);
  const keptIds = new Set(keptItems.map((item) => item.id));
  const documents = Object.fromEntries(
    Object.entries(state.documents).filter(([id]) => keptIds.has(id)),
  );

  return {
    folders: state.folders.filter((folder) => folder.id !== folderId),
    items: keptItems,
    documents,
  };
};
