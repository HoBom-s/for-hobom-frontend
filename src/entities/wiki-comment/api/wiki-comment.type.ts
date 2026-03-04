export interface CommentType {
  id: string;
  pageId: string;
  parentCommentId: string | null;
  content: string;
  author: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentRequest {
  content: string;
  parentCommentId?: string | null;
  author?: string | null;
}

export interface UpdateCommentRequest {
  content: string;
}
