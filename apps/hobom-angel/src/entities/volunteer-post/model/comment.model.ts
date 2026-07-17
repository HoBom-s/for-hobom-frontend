/** A comment on a review post. */
export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string | null;
}
