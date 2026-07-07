import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "hobom-design-system/icons";
import type { IssueCommentType } from "@/entities/issue-comment";
import { Hb } from "@/shared/ui";

// StyleX is atomic and cannot express the hover-reveal descendant selector, so
// the row styling is rendered as a scoped <style> tag instead.
const ROOT_CLASS = "issue-comment-item-root";
const ROOT_CSS = `
.${ROOT_CLASS} {
  display: flex;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.${ROOT_CLASS}:hover .comment-actions { opacity: 1; }
`;

interface IssueCommentItemProps {
  comment: IssueCommentType;
  authorName: string;
  isOwn: boolean;
  onUpdate: (commentId: string, body: string) => void;
  onDelete: (commentId: string) => void;
}

export const IssueCommentItem = ({
  comment,
  authorName,
  isOwn,
  onUpdate,
  onDelete,
}: IssueCommentItemProps) => {
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const initial = authorName.charAt(0).toUpperCase();

  const handleUpdate = () => {
    const trimmed = editBody.trim();

    if (!trimmed) return;
    onUpdate(comment.id, trimmed);
    setEditing(false);
  };

  return (
    <>
      {/* React 19 hoists and de-dupes by `href`, so the rule is emitted once
          even though every comment renders this. */}
      <style href={ROOT_CLASS} precedence="default">
        {ROOT_CSS}
      </style>
      <Hb.Box className={ROOT_CLASS}>
        <Hb.Avatar
          style={{
            width: 28,
            height: 28,
            fontSize: "0.75rem",
            fontWeight: 600,
            backgroundColor: "var(--hb-color-accent)",
            flexShrink: 0,
            marginTop: 2,
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
                fontSize: 13,
              }}
            >
              {authorName}
            </Hb.Text>
            <Hb.Text variant="caption" color="text.disabled">
              {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
            </Hb.Text>
            {comment.editedAt && (
              <Hb.Text variant="caption" color="text.disabled">
                (수정됨)
              </Hb.Text>
            )}

            {isOwn && (
              <Hb.Box
                className="comment-actions"
                style={{
                  display: "flex",
                  gap: 2,
                  marginLeft: "auto",
                  opacity: 0,
                  transition: "opacity 0.15s ease",
                }}
              >
                <Hb.Tooltip title="수정">
                  <Hb.Button.Icon
                    size="small"
                    aria-label="수정"
                    onClick={() => {
                      setEditing(!editing);
                      setEditBody(comment.body);
                    }}
                    style={{
                      padding: 2,
                    }}
                  >
                    <EditOutlined sx={{ fontSize: 15 }} />
                  </Hb.Button.Icon>
                </Hb.Tooltip>
                <Hb.Tooltip title="삭제">
                  <Hb.Button.Icon
                    size="small"
                    aria-label="삭제"
                    onClick={() => onDelete(comment.id)}
                    style={{
                      padding: 2,
                    }}
                  >
                    <DeleteOutlined sx={{ fontSize: 15 }} />
                  </Hb.Button.Icon>
                </Hb.Tooltip>
              </Hb.Box>
            )}
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
                aria-label="댓글 수정"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                autoFocus
              />
              <Hb.Box
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                }}
              >
                <Hb.Button size="small" onClick={() => setEditing(false)}>
                  취소
                </Hb.Button>
                <Hb.Button
                  size="small"
                  variant="primary"
                  onClick={handleUpdate}
                  disabled={!editBody.trim()}
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
                fontSize: 13,
              }}
            >
              {comment.body}
            </Hb.Text>
          )}
        </Hb.Box>
      </Hb.Box>
    </>
  );
};
