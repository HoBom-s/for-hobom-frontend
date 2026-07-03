/**
 * 워크스페이스 메타데이터 모델 — 폴더/아이템의 "정보"만 다룬다.
 *
 * 주의(FSD): 이 엔티티는 동일 레이어인 `entities/document`를 import할 수 없다.
 * 따라서 Item은 문서(StudioDocument) 자체를 들지 않고, 문서와의 결합은
 * 상위 레이어(features/workspace)에서 한다.
 */

export type FolderId = string;
export type ItemId = string;
export type FavoriteId = string;

/** 작업 폴더. 이름 변경 가능. */
export interface Folder {
  id: FolderId;
  name: string;
}

/** 작업 결과물(저장된 디자인)의 메타데이터. 실제 문서는 features 레이어가 보관한다. */
export interface WorkspaceItem {
  id: ItemId;
  name: string;
  folderId: FolderId;
}

/** 즐겨찾기 — 디자인을 핀하고 커스텀 라벨(이름 변경 가능)을 가진다. */
export interface Favorite {
  id: FavoriteId;
  designId: ItemId;
  label: string;
}
