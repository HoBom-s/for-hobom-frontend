import { httpClient, parseResponse } from "@/shared/api";
import { commentPageSchema } from "./comment.schema";
import type { Comment } from "../model/comment.model";

const parseComments = parseResponse(commentPageSchema, "GET /volunteer-posts/:id/comments");

export interface CommentPage {
  comments: Comment[];
  nextCursor: string | null;
  hasNext: boolean;
}

/** Fetch a page of a post's comments (oldest first — the thread reads top down). */
export const getComments = (
  postId: string,
  cursor: string | undefined,
  signal?: AbortSignal,
): Promise<CommentPage> => {
  const query = new URLSearchParams({ limit: "20" });

  if (cursor) query.set("cursor", cursor);

  return httpClient
    .get(`/volunteer-posts/${postId}/comments?${query.toString()}`, { signal })
    .then(parseComments)
    .then((page) => ({
      comments: page.items.map((raw) => ({
        id: raw.id,
        authorId: raw.authorId,
        body: raw.body,
        createdAt: raw.createdAt,
      })),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));
};

/** Post a comment on a review. */
export const addComment = (postId: string, body: string): Promise<void> =>
  httpClient.post(`/volunteer-posts/${postId}/comments`, { body }).then(() => undefined);
