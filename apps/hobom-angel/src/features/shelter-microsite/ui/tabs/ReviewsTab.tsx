import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { ConfirmDialog, EmptyState, Hb } from "hobom-design-system";
import { PLACEMENT_LABEL, reviewQueries } from "@/entities/review";
import { useCurrentUser } from "@/entities/user";
import { useOverlay } from "@/shared/model";
import type { Review, ShelterReputation } from "@/entities/review";
import { distributionBars, filledStars, formatAverage } from "../../lib/reputation.lib";
import { useReviewActions } from "../../model/useReviewActions";
import { useShelterReviews } from "../../model/useShelterReviews";
import { ReviewEditDialog } from "./ReviewEditDialog";
import { styles } from "./ReviewsTab.styles";

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

const Stars = ({ rating }: { rating: number }) => {
  const filled = filledStars(rating);

  return (
    <span {...stylex.props(styles.stars)} aria-label={`5점 만점에 ${rating}점`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} {...stylex.props(n > filled && styles.starMuted)} aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
};

const ReputationSummary = ({ reputation }: { reputation: ShelterReputation }) => (
  <div {...stylex.props(styles.summary)}>
    <div {...stylex.props(styles.score)}>
      <span {...stylex.props(styles.average)}>{formatAverage(reputation.average)}</span>
      <Stars rating={reputation.average} />
      <span {...stylex.props(styles.count)}>후기 {reputation.reviewCount}개</span>
    </div>
    <div {...stylex.props(styles.bars)}>
      {distributionBars(reputation).map((bar) => (
        <div key={bar.star} {...stylex.props(styles.barRow)}>
          <span {...stylex.props(styles.barStar)}>{bar.star}점</span>
          <span {...stylex.props(styles.barTrack)}>
            <span {...stylex.props(styles.barFill)} style={{ width: `${bar.pct}%` }} />
          </span>
          <span {...stylex.props(styles.barCount)}>{bar.count}</span>
        </div>
      ))}
    </div>
  </div>
);

interface ReviewCardProps {
  review: Review;
  mine: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const ReviewCard = ({ review, mine, onEdit, onDelete }: ReviewCardProps) => (
  <article {...stylex.props(styles.card)}>
    <div {...stylex.props(styles.cardHead)}>
      <Hb.Chip
        label={PLACEMENT_LABEL[review.placementType]}
        color="success"
        variant="soft"
        size="small"
      />
      <Stars rating={review.rating} />
      <span {...stylex.props(styles.headSpacer)} />
      {review.createdAt && <span {...stylex.props(styles.date)}>{formatDate(review.createdAt)}</span>}
    </div>
    <p {...stylex.props(styles.body)}>{review.body}</p>
    {mine && (
      <div {...stylex.props(styles.ownerActions)}>
        <button type="button" {...stylex.props(styles.ownerButton)} onClick={onEdit}>
          수정
        </button>
        <button
          type="button"
          {...stylex.props(styles.ownerButton, styles.ownerDanger)}
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    )}
  </article>
);

/** 후기 tab — the shelter's reputation summary plus its paginated reviews. The
 *  viewer can edit or delete their own reviews inline. */
export const ReviewsTab = ({ shelterId }: { shelterId: string }) => {
  const { data: reputation } = useSuspenseQuery(reviewQueries.reputation(shelterId));
  const { reviews, fetchNextPage, hasNextPage, isFetchingNextPage } = useShelterReviews(shelterId);
  const { user } = useCurrentUser();
  const { revise, revising, remove } = useReviewActions();
  const overlay = useOverlay();

  const editReview = (review: Review) =>
    overlay.open(({ close }) => (
      <ReviewEditDialog
        review={review}
        submitting={revising}
        onConfirm={(input) => revise(review.id, input)}
        onClose={close}
      />
    ));

  const deleteReview = (review: Review) =>
    overlay.open(({ close }) => (
      <ConfirmDialog
        open
        onClose={close}
        title="후기를 삭제할까요?"
        description="삭제한 후기는 되돌릴 수 없어요."
        confirmLabel="삭제하기"
        confirmColor="error"
        onConfirm={() => remove(review.id)}
      />
    ));

  return (
    <div {...stylex.props(styles.stack)}>
      <ReputationSummary reputation={reputation} />

      {reviews.length === 0 ? (
        <EmptyState message="아직 등록된 후기가 없어요." />
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            mine={review.authorId === user?.id}
            onEdit={() => editReview(review)}
            onDelete={() => deleteReview(review)}
          />
        ))
      )}

      {hasNextPage && (
        <div {...stylex.props(styles.more)}>
          <Hb.Button
            variant="secondary"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
          >
            후기 더 보기
          </Hb.Button>
        </div>
      )}
    </div>
  );
};
