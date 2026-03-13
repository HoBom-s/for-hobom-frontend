import { useMemo } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  issueCommentQueries,
  useCreateIssueComment,
  useUpdateIssueComment,
  useDeleteIssueComment,
} from "@/entities/issue-comment";
import { userQueries } from "@/entities/user";
import { useIssueDetailContext } from "../model/useIssueDetailContext";
import { IssueCommentInput } from "./IssueCommentInput";
import { IssueCommentItem } from "./IssueCommentItem";

export const IssueCommentsSection = () => {
  const { issue, projectId, currentUserId } = useIssueDetailContext();
  const issueId = issue.id;

  const { data } = useQuery({
    ...issueCommentQueries.list(projectId, issueId),
  });
  const { data: usersData } = useQuery(userQueries.list());
  const userMap = useMemo(() => {
    const map = new Map<string, string>();

    for (const user of usersData?.items ?? []) {
      map.set(user.id, user.nickname);
    }

    return map;
  }, [usersData]);

  const comments = data?.items ?? [];
  const createComment = useCreateIssueComment();
  const updateComment = useUpdateIssueComment();
  const deleteComment = useDeleteIssueComment();

  const handleCreate = (body: string) => {
    createComment.mutate({ projectId, issueId, body });
  };

  const handleUpdate = (commentId: string, body: string) => {
    updateComment.mutate({ projectId, issueId, commentId, body });
  };

  const handleDelete = (commentId: string) => {
    deleteComment.mutate({ projectId, issueId, commentId });
  };

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography
        variant="subtitle2"
        fontWeight={600}
        sx={{ mb: 1.5, fontSize: 13 }}
      >
        댓글 {comments.length > 0 && `(${comments.length})`}
      </Typography>

      <IssueCommentInput
        onSubmit={handleCreate}
        loading={createComment.isPending}
      />

      {comments.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {comments.map((comment) => (
            <IssueCommentItem
              key={comment.id}
              comment={comment}
              authorName={userMap.get(comment.author) ?? comment.author}
              isOwn={comment.author === currentUserId}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}
    </>
  );
};
