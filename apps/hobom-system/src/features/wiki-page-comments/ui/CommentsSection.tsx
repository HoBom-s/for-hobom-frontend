import { useCreateComment, CreateCommentSchema } from "@/entities/wiki-comment";
import { validateWithZod } from "@/shared/lib";
import { useToast } from "@/shared/model";
import type { UserType } from "@/entities/user";
import { Hb } from "@/shared/ui";
import { usePageComments } from "../model/usePageComments";
import { CommentInput } from "./CommentInput";
import { CommentList } from "./CommentList";

interface CommentsSectionProps {
  spaceKey: string;
  pageId: string;
  userInfo: UserType;
}

const validateComment = validateWithZod(CreateCommentSchema);

export const CommentsSection = ({
  spaceKey,
  pageId,
  userInfo,
}: CommentsSectionProps) => {
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
    createComment.mutate({
      spaceKey,
      pageId,
      content: result.content,
      author: userInfo.nickname,
    });
  };

  return (
    <Hb.Box sx={{ px: 3, py: 2 }}>
      <Hb.Text variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
        댓글 {totalCount > 0 && `(${totalCount})`}
      </Hb.Text>
      <CommentInput
        onSubmit={handleCreateComment}
        loading={createComment.isPending}
      />
      {loadedCount > 0 && (
        <Hb.Box sx={{ mt: 2 }}>
          <CommentList
            comments={comments}
            spaceKey={spaceKey}
            pageId={pageId}
            userInfo={userInfo}
          />
          {hasNextPage && (
            <Hb.Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Hb.Button
                variant="ghost"
                size="small"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{ textTransform: "none", color: "text.secondary" }}
              >
                {isFetchingNextPage ? (
                  <Hb.Progress.Circular size={16} sx={{ mr: 1 }} />
                ) : null}
                댓글 더보기 ({loadedCount}/{totalCount})
              </Hb.Button>
            </Hb.Box>
          )}
        </Hb.Box>
      )}
    </Hb.Box>
  );
};
