export interface IssueCommentType {
  id: string;
  issue: string;
  author: string;
  body: string;
  editedAt: string | null;
  createdAt: string;
}

export interface CreateIssueCommentRequest {
  body: string;
}

export interface UpdateIssueCommentRequest {
  body: string;
}
