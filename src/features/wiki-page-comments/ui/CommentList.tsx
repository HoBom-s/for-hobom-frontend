import { Fragment, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ReplyOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@/entities/wiki-comment";
import { UserType } from "@/entities/user";
import type { CommentTreeNode } from "../lib/build-comment-tree.lib";
import { CommentInput } from "./CommentInput";

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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
    </Box>
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
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const createComment = useCreateComment();
  const updateComment = useUpdateComment();
  const deleteComment = useDeleteComment();

  const authorName = comment.author ?? "익명";
  const initial = authorName.charAt(0).toUpperCase();

  const handleReply = (content: string) => {
    createComment.mutate(
      {
        spaceKey,
        pageId,
        content,
        parentCommentId: comment.id,
        author: userInfo.nickname,
      },
      { onSuccess: () => setReplying(false) },
    );
  };

  const handleUpdate = () => {
    const trimmed = editContent.trim();
    if (!trimmed) return;
    updateComment.mutate(
      { spaceKey, pageId, commentId: comment.id, content: trimmed },
      { onSuccess: () => setEditing(false) },
    );
  };

  const handleDelete = () => {
    deleteComment.mutate({ spaceKey, pageId, commentId: comment.id });
  };

  return (
    <Fragment>
      <Box
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
        <Avatar
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
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* 작성자 + 날짜 + 액션 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: "text.primary" }}
            >
              {authorName}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
            </Typography>

            <Box
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
                <Tooltip title="답글">
                  <IconButton
                    size="small"
                    aria-label="답글"
                    onClick={() => setReplying(!replying)}
                    sx={{ p: 0.25 }}
                  >
                    <ReplyOutlined sx={{ fontSize: 15 }} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="수정">
                <IconButton
                  size="small"
                  aria-label="수정"
                  onClick={() => {
                    setEditing(!editing);
                    setEditContent(comment.content);
                  }}
                  sx={{ p: 0.25 }}
                >
                  <EditOutlined sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="삭제">
                <IconButton
                  size="small"
                  aria-label="삭제"
                  onClick={handleDelete}
                  sx={{ p: 0.25 }}
                >
                  <DeleteOutlined sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* 내용 or 수정 폼 */}
          {editing ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                maxRows={6}
                size="small"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  onClick={() => setEditing(false)}
                  sx={{ textTransform: "none" }}
                >
                  취소
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleUpdate}
                  disabled={!editContent.trim()}
                  sx={{ textTransform: "none" }}
                >
                  수정
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "pre-wrap",
                color: "text.primary",
                lineHeight: 1.6,
              }}
            >
              {comment.content}
            </Typography>
          )}

          {/* 답글 입력 */}
          {replying && (
            <Box sx={{ mt: 1.5 }}>
              <CommentInput
                onSubmit={handleReply}
                loading={createComment.isPending}
                placeholder="답글을 입력하세요..."
                autoFocus
              />
            </Box>
          )}
        </Box>
      </Box>

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
