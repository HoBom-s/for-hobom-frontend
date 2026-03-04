export interface PageType {
  id: string;
  spaceId: string;
  parentPageId: string | null;
  title: string;
  content: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageTreeNode {
  id: string;
  title: string;
  position: number;
  children: PageTreeNode[];
}

export interface CreatePageRequest {
  title: string;
  content: string;
  parentPageId?: string | null;
  position?: number;
}

export interface UpdatePageRequest {
  title: string;
  content: string;
  position?: number | null;
}

export interface PageVersionType {
  id: string;
  pageId: string;
  version: number;
  title: string;
  content: string;
  editedBy: string | null;
  createdAt: string;
}

export interface SearchResultType {
  id: string;
  spaceId: string;
  title: string;
  updatedAt: string;
}
