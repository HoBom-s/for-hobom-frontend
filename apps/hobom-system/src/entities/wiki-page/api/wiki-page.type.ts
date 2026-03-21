export interface PageLabelType {
  id: string;
  name: string;
  color: string;
}

export interface PageType {
  id: string;
  spaceId: string;
  parentPageId: string | null;
  title: string;
  content: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  labels: PageLabelType[];
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

// ── Move / Copy ──

export interface MovePageRequest {
  targetSpaceKey: string;
  parentPageId: string | null;
}

export interface CopyPageRequest {
  targetSpaceKey: string;
  parentPageId: string | null;
}

// ── Version Diff ──

export type DiffChangeType = "ADDED" | "REMOVED" | "UNCHANGED";

export interface DiffEntryType {
  lineNumber: number;
  type: DiffChangeType;
  content: string;
}

// ── Trash ──

export interface TrashPageType {
  id: string;
  spaceId: string;
  parentPageId: string | null;
  title: string;
  position: number;
  createdAt: string;
  deletedAt: string | null;
  deletedBy: string | null;
}
