import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawComment, RawCommentPage } from "./comment.type";

export const commentSchema: Schema<RawComment> = HoBomSchema.object({
  id: HoBomSchema.string(),
  postId: HoBomSchema.string(),
  authorId: HoBomSchema.string(),
  body: HoBomSchema.string(),
  createdAt: HoBomSchema.string().nullable(),
});

/** `GET /volunteer-posts/:postId/comments` — a cursor page of comments. */
export const commentPageSchema: Schema<RawCommentPage> = HoBomSchema.object({
  items: HoBomSchema.array(commentSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});
