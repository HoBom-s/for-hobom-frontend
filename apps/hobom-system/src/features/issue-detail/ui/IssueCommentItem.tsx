import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "hobom-design-system/icons";
import type { IssueCommentType } from "@/entities/issue-comment";
import { Hb } from "@/shared/ui";

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
    <Hb.Box
      sx={{
        display: "flex",
        gap: 1.5,
        py: 1.5,
        "&:hover .comment-actions": { opacity: 1 },
      }}
    >
      <Hb.Avatar
        sx={{
          width: 28,
          height: 28,
          fontSize: "0.75rem",
          fontWeight: 600,
          bgcolor: "primary.main",
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {initial}
      </Hb.Avatar>

      <Hb.Box sx={{ flex: 1, minWidth: 0 }}>
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Hb.Text variant="body2" fontWeight={600} sx={{ fontSize: 13 }}>
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
              sx={{
                display: "flex",
                gap: 0.25,
                ml: "auto",
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
                  sx={{ p: 0.25 }}
                >
                  <EditOutlined sx={{ fontSize: 15 }} />
                </Hb.Button.Icon>
              </Hb.Tooltip>
              <Hb.Tooltip title="삭제">
                <Hb.Button.Icon
                  size="small"
                  aria-label="삭제"
                  onClick={() => onDelete(comment.id)}
                  sx={{ p: 0.25 }}
                >
                  <DeleteOutlined sx={{ fontSize: 15 }} />
                </Hb.Button.Icon>
              </Hb.Tooltip>
            </Hb.Box>
          )}
        </Hb.Box>

        {editing ? (
          <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
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
            sx={{
              whiteSpace: "pre-wrap",
              color: "text.primary",
              lineHeight: 1.6,
              fontSize: 13,
            }}
          >
            {comment.body}
          </Hb.Text>
        )}
      </Hb.Box>
    </Hb.Box>
  );
};
