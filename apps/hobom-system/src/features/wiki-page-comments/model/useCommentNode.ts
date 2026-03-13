import { useState } from "react";
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@/entities/wiki-comment";

export const useCommentNode = ({
  spaceKey,
  pageId,
  commentId,
  content,
  author,
}: {
  spaceKey: string;
  pageId: string;
  commentId: string;
  content: string;
  author: string;
}) => {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const createComment = useCreateComment();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const handleReply = (replyContent: string) => {
    createComment.mutate(
      {
        spaceKey,
        pageId,
        content: replyContent,
        parentCommentId: commentId,
        author,
      },
      { onSuccess: () => setReplying(false) },
    );
  };

  const handleUpdate = () => {
    const trimmed = editContent.trim();

    if (!trimmed) return;
    updateComment.mutate(
      { spaceKey, pageId, commentId, content: trimmed },
      { onSuccess: () => setEditing(false) },
    );
  };

  const handleDelete = () => {
    deleteComment.mutate({ spaceKey, pageId, commentId });
  };

  const startEditing = () => {
    setEditing(true);
    setEditContent(content);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  return {
    replying,
    setReplying,
    editing,
    editContent,
    setEditContent,
    isReplyPending: createComment.isPending,
    handleReply,
    handleUpdate,
    handleDelete,
    startEditing,
    cancelEditing,
  };
};
