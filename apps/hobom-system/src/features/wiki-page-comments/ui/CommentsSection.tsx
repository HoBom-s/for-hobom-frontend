import { useCreateComment, CreateCommentSchema } from "@/entities/wiki-comment";
import { validateWithSchema } from "@/shared/lib";
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

const validateComment = validateWithSchema(CreateCommentSchema);

export const CommentsSection = ({ spaceKey, pageId, userInfo }: CommentsSectionProps) => {
  const { comments, totalCount, loadedCount, hasNextPage, fetchNextPage, isFetchingNextPage } =
    usePageComments(spaceKey, pageId);
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
    <Hb.Box
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <Hb.Text
        variant="subtitle1"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        댓글 {totalCount > 0 && `(${totalCount})`}
      </Hb.Text>
      <CommentInput onSubmit={handleCreateComment} loading={createComment.isPending} />
      {loadedCount > 0 && (
        <Hb.Box
          style={{
            marginTop: 16,
          }}
        >
          <CommentList
            comments={comments}
            spaceKey={spaceKey}
            pageId={pageId}
            userInfo={userInfo}
          />
          {hasNextPage && (
            <Hb.Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <Hb.Button
                variant="ghost"
                size="small"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{ textTransform: "none", color: "text.secondary" }}
              >
                {isFetchingNextPage ? <Hb.Progress.Circular size={16} sx={{ mr: 1 }} /> : null}
                댓글 더보기 ({loadedCount}/{totalCount})
              </Hb.Button>
            </Hb.Box>
          )}
        </Hb.Box>
      )}
    </Hb.Box>
  );
};
