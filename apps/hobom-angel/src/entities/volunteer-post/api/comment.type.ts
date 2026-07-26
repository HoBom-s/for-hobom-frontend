/** `GET /volunteer-posts/:postId/comments` item. */
export interface RawComment {
  id: string;
  postId: string;
  authorId: string;
  body: string;
  createdAt: string | null;
}

/** Cursor page of comments. */
export interface RawCommentPage {
  items: RawComment[];
  nextCursor: string | null;
  hasNext: boolean;
}
