import { Fragment } from "react";
import * as stylex from "@stylexjs/stylex";
import { ReplyOutlined, EditOutlined, DeleteOutlined } from "hobom-design-system/icons";
import type { UserType } from "@/entities/user";
import { Hb } from "@/shared/ui";
import { useCommentNode } from "../model/useCommentNode";
import { CommentInput } from "./CommentInput";
import type { CommentTreeNode } from "../lib/build-comment-tree.lib";

const styles = stylex.create({
  node: {
    display: "flex",
    gap: 12,
    paddingTop: 12,
    paddingBottom: 12,
    ":hover .comment-actions": { opacity: 1 },
  },
  nodeRoot: {
    borderBottom: "1px solid",
    borderColor: "var(--hb-color-border)",
    ":last-of-type": { borderBottom: "none" },
  },
  nodeNested: (indent: number) => ({
    position: "relative",
    paddingLeft: indent,
    "::before": {
      content: '""',
      position: "absolute",
      left: indent - 20,
      top: 0,
      bottom: 0,
      width: 2,
      backgroundColor: "var(--hb-color-border)",
      borderRadius: 8,
    },
  }),
  actions: {
    display: "flex",
    gap: 2,
    marginLeft: "auto",
    opacity: 0,
    transition: "opacity 0.15s ease",
  },
});

interface CommentListProps {
  comments: CommentTreeNode[];
  spaceKey: string;
  pageId: string;
  userInfo: UserType;
}

export const CommentList = ({ comments, spaceKey, pageId, userInfo }: CommentListProps) => {
  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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

const CommentNode = ({ comment, spaceKey, pageId, depth, userInfo }: CommentNodeProps) => {
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
        {...stylex.props(
          styles.node,
          depth === 0 && styles.nodeRoot,
          depth > 0 && styles.nodeNested(depth * 40),
        )}
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

        <Hb.Box
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Hb.Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <Hb.Text
              variant="body2"
              fontWeight={600}
              style={{
                color: "var(--hb-color-text-primary)",
              }}
            >
              {authorName}
            </Hb.Text>
            <Hb.Text variant="caption" color="text.disabled">
              {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
            </Hb.Text>

            <Hb.Box className={`comment-actions ${stylex.props(styles.actions).className}`}>
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
            <Hb.Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
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
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                }}
              >
                <Hb.Button size="small" onClick={cancelEditing} sx={{ textTransform: "none" }}>
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
              style={{
                whiteSpace: "pre-wrap",
                color: "var(--hb-color-text-primary)",
                lineHeight: 1.6,
              }}
            >
              {comment.content}
            </Hb.Text>
          )}

          {replying && (
            <Hb.Box
              style={{
                marginTop: 12,
              }}
            >
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
