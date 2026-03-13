import { Fragment } from "react";
import {
  ReplyOutlined,
  EditOutlined,
  DeleteOutlined,
} from "hobom-design-system/icons";
import type { UserType } from "@/entities/user";
import { Hb } from "@/shared/ui";
import { useCommentNode } from "../model/useCommentNode";
import { CommentInput } from "./CommentInput";
import type { CommentTreeNode } from "../lib/build-comment-tree.lib";

interface CommentListProps {
  comments: CommentTreeNode[];
  spaceKey: string;
  pageId: string;
  userInfo: UserType;
}

export const CommentList = ({
  comments,
  spaceKey,
  pageId,
  userInfo,
}: CommentListProps) => {
  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column" }}>
      {comments.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          spaceKey={spaceKey}
          pageId={pageId}
          depth={0}
          userInfo={userInfo}
        />
      ))}
    </Hb.Box>
  );
};

interface CommentNodeProps {
  comment: CommentTreeNode;
  spaceKey: string;
  pageId: string;
  depth: number;
  userInfo: UserType;
}

const CommentNode = ({
  comment,
  spaceKey,
  pageId,
  depth,
  userInfo,
}: CommentNodeProps) => {
  const {
    replying,
    setReplying,
    editing,
    editContent,
    setEditContent,
    isReplyPending,
    handleReply,
    handleUpdate,
    handleDelete,
    startEditing,
    cancelEditing,
  } = useCommentNode({
    spaceKey,
    pageId,
    commentId: comment.id,
    content: comment.content,
    author: userInfo.nickname,
  });

  const authorName = comment.author ?? "익명";
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <Fragment>
      <Hb.Box
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          pl: depth > 0 ? depth * 5 : 0,
          ...(depth === 0 && {
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:last-of-type": { borderBottom: "none" },
          }),
          ...(depth > 0 && {
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              left: depth * 5 - 2.5 * 8,
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "divider",
              borderRadius: 1,
            },
          }),
          "&:hover .comment-actions": { opacity: 1 },
        }}
      >
        <Hb.Avatar
          sx={{
            width: 28,
            height: 28,
            fontSize: "0.75rem",
            fontWeight: 600,
            bgcolor: depth === 0 ? "primary.main" : "grey.400",
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {initial}
        </Hb.Avatar>

        <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
          <Hb.Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Hb.Text
              variant="body2"
              fontWeight={600}
              sx={{ color: "text.primary" }}
            >
              {authorName}
            </Hb.Text>
            <Hb.Text variant="caption" color="text.disabled">
              {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
            </Hb.Text>

            <Hb.Box
              className="comment-actions"
              sx={{
                display: "flex",
                gap: 0.25,
                ml: "auto",
                opacity: 0,
                transition: "opacity 0.15s ease",
              }}
            >
              {depth < 2 && (
                <Hb.Tooltip title="답글">
                  <Hb.Button.Icon
                    size="small"
                    aria-label="답글"
                    onClick={() => setReplying(!replying)}
                    sx={{ p: 0.25 }}
                  >
                    <ReplyOutlined sx={{ fontSize: 15 }} />
                  </Hb.Button.Icon>
                </Hb.Tooltip>
              )}
              <Hb.Tooltip title="수정">
                <Hb.Button.Icon
                  size="small"
                  aria-label="수정"
                  onClick={editing ? cancelEditing : startEditing}
                  sx={{ p: 0.25 }}
                >
                  <EditOutlined sx={{ fontSize: 15 }} />
                </Hb.Button.Icon>
              </Hb.Tooltip>
              <Hb.Tooltip title="삭제">
                <Hb.Button.Icon
                  size="small"
                  aria-label="삭제"
                  onClick={handleDelete}
                  sx={{ p: 0.25 }}
                >
                  <DeleteOutlined sx={{ fontSize: 15 }} />
                </Hb.Button.Icon>
              </Hb.Tooltip>
            </Hb.Box>
          </Hb.Box>

          {editing ? (
            <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Hb.TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={6}
                size="small"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <Hb.Box
                sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
              >
                <Hb.Button
                  size="small"
                  onClick={cancelEditing}
                  sx={{ textTransform: "none" }}
                >
                  취소
                </Hb.Button>
                <Hb.Button
                  size="small"
                  variant="primary"
                  onClick={handleUpdate}
                  disabled={!editContent.trim()}
                  sx={{ textTransform: "none" }}
                >
                  수정
                </Hb.Button>
              </Hb.Box>
            </Hb.Box>
          ) : (
            <Hb.Text
              variant="body2"
              sx={{
                whiteSpace: "pre-wrap",
                color: "text.primary",
                lineHeight: 1.6,
              }}
            >
              {comment.content}
            </Hb.Text>
          )}

          {replying && (
            <Hb.Box sx={{ mt: 1.5 }}>
              <CommentInput
                onSubmit={handleReply}
                loading={isReplyPending}
                placeholder="답글을 입력하세요..."
                autoFocus
              />
            </Hb.Box>
          )}
        </Hb.Box>
      </Hb.Box>

      {comment.children.map((child) => (
        <CommentNode
          key={child.id}
          comment={child}
          spaceKey={spaceKey}
          pageId={pageId}
          depth={depth + 1}
          userInfo={userInfo}
        />
      ))}
    </Fragment>
  );
};
