import type {
  Favorite,
  FavoriteId,
  Folder,
  FolderId,
  ItemId,
  WorkspaceItem,
} from "@/entities/workspace";
import type { StudioDocument } from "@/entities/document";

/** 워크스페이스 인메모리 상태 — 폴더·아이템 메타 + 아이템별 문서 + 즐겨찾기. */
export interface WorkspaceState {
  folders: Folder[];
  items: WorkspaceItem[];
  documents: Record<ItemId, StudioDocument>;
  favorites: Favorite[];
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

/** 아이템과 그 문서·즐겨찾기를 제거한 새 상태를 반환한다(불변). */
export const removeDesign = (state: WorkspaceState, itemId: ItemId): WorkspaceState => {
  const { [itemId]: _removed, ...documents } = state.documents;

  return {
    ...state,
    items: state.items.filter((item) => item.id !== itemId),
    documents,
    favorites: state.favorites.filter((favorite) => favorite.designId !== itemId),
  };
};

/** 폴더와 그 안의 아이템·문서·즐겨찾기를 모두 제거한 새 상태를 반환한다(불변, cascade). */
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
    favorites: state.favorites.filter((favorite) => keptIds.has(favorite.designId)),
  };
};

/** 즐겨찾기를 추가한다(같은 디자인 중복 방지, 불변). */
export const addFavorite = (state: WorkspaceState, favorite: Favorite): WorkspaceState =>
  state.favorites.some((existing) => existing.designId === favorite.designId)
    ? state
    : { ...state, favorites: [...state.favorites, favorite] };

/** 즐겨찾기를 제거한다(불변). */
export const removeFavorite = (state: WorkspaceState, id: FavoriteId): WorkspaceState => ({
  ...state,
  favorites: state.favorites.filter((favorite) => favorite.id !== id),
});

/** 즐겨찾기 라벨을 바꾼다(불변). */
export const renameFavorite = (
  state: WorkspaceState,
  id: FavoriteId,
  label: string,
): WorkspaceState => ({
  ...state,
  favorites: state.favorites.map((favorite) =>
    favorite.id === id ? { ...favorite, label } : favorite,
  ),
});
