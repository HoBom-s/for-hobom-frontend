import { useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { VolunteerPost } from "@/entities/volunteer-post";
import { CommentItem } from "./CommentItem";
import { EventTag } from "./EventTag";
import { PostActions } from "./PostActions";
import { PostAuthor } from "./PostAuthor";
import { PostImages } from "./PostImages";
import { styles } from "./PostDetailModal.styles";
import { useAddComment } from "../model/useAddComment";
import { useComments } from "../model/useComments";
import { formatPostTime } from "../lib/format-post-time.lib";
import { postImageKeys, postText } from "../lib/post-content.lib";

interface PostDetailModalProps {
  post: VolunteerPost;
  onToggleLike: (post: VolunteerPost) => void;
  onToggleBookmark: (post: VolunteerPost) => void;
  onClose: () => void;
}

const LONG_TEXT = 140;

/** Detail view: image carousel on the left, content + infinite
 *  comment thread with a composer on the right. Local state mirrors reactions so
 *  the modal responds instantly while the feed cache updates too. */
export const PostDetailModal = ({
  post: initial,
  onToggleLike,
  onToggleBookmark,
  onClose,
}: PostDetailModalProps) => {
  const [post, setPost] = useState(initial);
  const [body, setBody] = useState("");
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { comments, loading, fetchNextPage, hasNextPage, isFetchingNextPage } = useComments(post.id);
  const addComment = useAddComment(post.id);

  useEffect(() => {
    const root = scrollRef.current;
    const target = sentinelRef.current;

    if (!root || !target || !hasNextPage) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { root },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const toggleLike = () => {
    onToggleLike(post);
    setPost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likeCount: prev.likeCount + (prev.liked ? -1 : 1),
    }));
  };

  const toggleBookmark = () => {
    onToggleBookmark(post);
    setPost((prev) => ({ ...prev, bookmarked: !prev.bookmarked }));
  };

  const submit = () => {
    const text = body.trim();

    if (!text) return;

    addComment.mutate(text, {
      onSuccess: () => {
        setPost((prev) => ({ ...prev, commentCount: prev.commentCount + 1 }));
        setBody("");
      },
    });
  };

  const images = postImageKeys(post.content);
  const text = postText(post.content);
  const clamped = text.length > LONG_TEXT && !expanded;

  return (
    <Hb.Dialog.Root
      open
      onClose={onClose}
      size="md"
      bottomSheet
      style={{ maxWidth: 820 }}
    >
      <div {...stylex.props(styles.pane)}>
        {images.length > 0 && (
          <div {...stylex.props(styles.media)}>
            <PostImages imageKeys={images} contain />
          </div>
        )}

        <div {...stylex.props(styles.side)}>
          <div {...stylex.props(styles.header)}>
            <PostAuthor authorId={post.authorId} time={formatPostTime(post.createdAt)} />
            {post.eventId && (
              <div>
                <EventTag eventId={post.eventId} />
              </div>
            )}
          </div>

          {text && (
            <div {...stylex.props(styles.textWrap)}>
              <p {...stylex.props(styles.text, clamped && styles.textClamp)}>{text}</p>
              {text.length > LONG_TEXT && !expanded && (
                <button
                  type="button"
                  {...stylex.props(styles.more)}
                  onClick={() => setExpanded(true)}
                >
                  … 더보기
                </button>
              )}
            </div>
          )}

          <Hb.Divider />

          <div {...stylex.props(styles.commentsList)} ref={scrollRef}>
            {!loading && comments.length === 0 && (
              <span {...stylex.props(styles.empty)}>첫 댓글을 남겨보세요.</span>
            )}
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            <div ref={sentinelRef} />
            {isFetchingNextPage && <span {...stylex.props(styles.empty)}>댓글 불러오는 중…</span>}
          </div>

          <div {...stylex.props(styles.footer)}>
            <PostActions
              post={post}
              onToggleLike={toggleLike}
              onToggleBookmark={toggleBookmark}
              onComment={() => inputRef.current?.focus()}
            />
            <div {...stylex.props(styles.composer)}>
              <input
                ref={inputRef}
                {...stylex.props(styles.input)}
                value={body}
                placeholder="댓글 달기…"
                onChange={(event) => setBody(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.nativeEvent.isComposing) submit();
                }}
              />
              <Hb.Button
                variant="primary"
                size="small"
                onClick={submit}
                disabled={!body.trim()}
                loading={addComment.isPending}
              >
                등록
              </Hb.Button>
            </div>
          </div>
        </div>
      </div>
    </Hb.Dialog.Root>
  );
};
