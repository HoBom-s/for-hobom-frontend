import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useCreateComment, CreateCommentSchema } from "@/entities/wiki-comment";
import { validateWithZod } from "@/shared/lib";
import { useToast } from "@/shared/model";
import { usePageComments } from "../model/usePageComments";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";

interface CommentsSectionProps {
  spaceKey: string;
  pageId: string;
}

const validateComment = validateWithZod(CreateCommentSchema);

export const CommentsSection = ({ spaceKey, pageId }: CommentsSectionProps) => {
  const {
    comments,
    totalCount,
    loadedCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePageComments(spaceKey, pageId);
  const createComment = useCreateComment();
  const { openErrorToast } = useToast();

  const handleCreateComment = (content: string) => {
    const result = validateComment({ content });
    if (result instanceof Error) {
      openErrorToast({ message: result.message });
      return;
    }
    createComment.mutate({ spaceKey, pageId, content: result.content });
  };

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
        댓글 {totalCount > 0 && `(${totalCount})`}
      </Typography>
      <CommentInput
        onSubmit={handleCreateComment}
        loading={createComment.isPending}
      />
      {loadedCount > 0 && (
        <Box sx={{ mt: 2 }}>
          <CommentList
            comments={comments}
            spaceKey={spaceKey}
            pageId={pageId}
          />
          {hasNextPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{ textTransform: "none", color: "text.secondary" }}
              >
                {isFetchingNextPage ? (
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                ) : null}
                댓글 더보기 ({loadedCount}/{totalCount})
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
