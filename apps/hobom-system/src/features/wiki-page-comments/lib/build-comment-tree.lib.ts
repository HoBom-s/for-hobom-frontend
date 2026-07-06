import type { CommentType } from "@/entities/wiki-comment";

export interface CommentTreeNode extends CommentType {
  children: CommentTreeNode[];
}

export const buildCommentTree = (comments: CommentType[]): CommentTreeNode[] => {
  const map = new Map<string, CommentTreeNode>();
  const roots: CommentTreeNode[] = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, children: [] });
  }

  for (const comment of comments) {
    const node = map.get(comment.id);

    if (!node) continue;

    if (comment.parentCommentId) {
      const parent = map.get(comment.parentCommentId);

      if (parent) {
        parent.children.push(node);
        continue;
      }
    }
    roots.push(node);
  }

  return roots;
};
