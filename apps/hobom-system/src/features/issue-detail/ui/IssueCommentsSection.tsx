import { useMemo } from "react";
import { useQuery } from "hobom-data";
import {
  issueCommentQueries,
  useCreateIssueComment,
  useUpdateIssueComment,
  useDeleteIssueComment,
} from "@/entities/issue-comment";
import { userQueries } from "@/entities/user";
import { Hb } from "@/shared/ui";
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
      <Hb.Divider
        style={{
          marginTop: 16,
          marginBottom: 16,
        }}
      />
      <Hb.Text
        variant="subtitle2"
        fontWeight={600}
        style={{
          marginBottom: 12,
          fontSize: 13,
        }}
      >
        댓글 {comments.length > 0 && `(${comments.length})`}
      </Hb.Text>
      <IssueCommentInput onSubmit={handleCreate} loading={createComment.isPending} />
      {comments.length > 0 && (
        <Hb.Box
          style={{
            marginTop: 8,
          }}
        >
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
        </Hb.Box>
      )}
    </>
  );
};
