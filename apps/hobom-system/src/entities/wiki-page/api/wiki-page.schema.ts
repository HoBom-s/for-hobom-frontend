import { HoBomSchema } from "hobom-schema";
import type { PaginatedItems } from "@/shared/api";
import type { Schema } from "hobom-schema";
import type {
  PageLabelType,
  PageType,
  PageTreeNode,
  PageVersionType,
  SearchResultType,
  DiffEntryType,
  TrashPageType,
} from "./wiki-page.type";

const pageLabelSchema: Schema<PageLabelType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  name: HoBomSchema.string(),
  color: HoBomSchema.string(),
});

export const pageSchema: Schema<PageType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  spaceId: HoBomSchema.string(),
  parentPageId: HoBomSchema.string().nullable(),
  title: HoBomSchema.string(),
  content: HoBomSchema.string(),
  position: HoBomSchema.number(),
  createdAt: HoBomSchema.date(),
  updatedAt: HoBomSchema.date(),
  labels: HoBomSchema.array(pageLabelSchema),
});

export const pageTreeNodeSchema: Schema<PageTreeNode> = HoBomSchema.object({
  id: HoBomSchema.string(),
  title: HoBomSchema.string(),
  position: HoBomSchema.number(),
  get children() {
    return HoBomSchema.array(pageTreeNodeSchema);
  },
});

export const pageTreeSchema: Schema<PageTreeNode[]> = HoBomSchema.array(pageTreeNodeSchema);

export const pageVersionSchema: Schema<PageVersionType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  pageId: HoBomSchema.string(),
  version: HoBomSchema.number(),
  title: HoBomSchema.string(),
  content: HoBomSchema.string(),
  editedBy: HoBomSchema.string().nullable(),
  createdAt: HoBomSchema.date(),
});

export const pageVersionsPageSchema: Schema<PaginatedItems<PageVersionType>> = HoBomSchema.object({
  items: HoBomSchema.array(pageVersionSchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});

export const diffEntrySchema: Schema<DiffEntryType> = HoBomSchema.object({
  lineNumber: HoBomSchema.number(),
  type: HoBomSchema.enum(["ADDED", "REMOVED", "UNCHANGED"]),
  content: HoBomSchema.string(),
});

export const diffEntriesSchema: Schema<DiffEntryType[]> = HoBomSchema.array(diffEntrySchema);

export const trashPageSchema: Schema<TrashPageType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  spaceId: HoBomSchema.string(),
  parentPageId: HoBomSchema.string().nullable(),
  title: HoBomSchema.string(),
  position: HoBomSchema.number(),
  createdAt: HoBomSchema.date(),
  deletedAt: HoBomSchema.date().nullable(),
  deletedBy: HoBomSchema.string().nullable(),
});

export const trashPagesPageSchema: Schema<PaginatedItems<TrashPageType>> = HoBomSchema.object({
  items: HoBomSchema.array(trashPageSchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});

export const searchResultSchema: Schema<SearchResultType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  spaceId: HoBomSchema.string(),
  title: HoBomSchema.string(),
  updatedAt: HoBomSchema.date(),
});

export const searchResultsPageSchema: Schema<PaginatedItems<SearchResultType>> = HoBomSchema.object({
  items: HoBomSchema.array(searchResultSchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});
