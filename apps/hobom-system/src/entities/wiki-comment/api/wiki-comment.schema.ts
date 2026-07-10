import { HoBomSchema } from "hobom-schema";
import type { PaginatedItems } from "@/shared/api";
import type { Schema } from "hobom-schema";
import type { CommentType } from "./wiki-comment.type";

export const commentSchema: Schema<CommentType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  pageId: HoBomSchema.string(),
  parentCommentId: HoBomSchema.string().nullable(),
  content: HoBomSchema.string(),
  author: HoBomSchema.string().nullable(),
  createdAt: HoBomSchema.date(),
  updatedAt: HoBomSchema.date(),
});

export const commentsPageSchema: Schema<PaginatedItems<CommentType>> = HoBomSchema.object({
  items: HoBomSchema.array(commentSchema),
  totalCount: HoBomSchema.number(),
  offset: HoBomSchema.number(),
  limit: HoBomSchema.number(),
});
