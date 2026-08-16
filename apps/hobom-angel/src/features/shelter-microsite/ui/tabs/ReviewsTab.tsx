import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { EmptyState, Hb } from "hobom-design-system";
import { PLACEMENT_LABEL, reviewQueries } from "@/entities/review";
import type { Review, ShelterReputation } from "@/entities/review";
import { distributionBars, filledStars, formatAverage } from "../../lib/reputation.lib";
import { useShelterReviews } from "../../model/useShelterReviews";
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

const ReviewCard = ({ review }: { review: Review }) => (
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
  </article>
);

/** 후기 tab — the shelter's reputation summary plus its paginated reviews. */
export const ReviewsTab = ({ shelterId }: { shelterId: string }) => {
  const { data: reputation } = useSuspenseQuery(reviewQueries.reputation(shelterId));
  const { reviews, fetchNextPage, hasNextPage, isFetchingNextPage } = useShelterReviews(shelterId);

  return (
    <div {...stylex.props(styles.stack)}>
      <ReputationSummary reputation={reputation} />

      {reviews.length === 0 ? (
        <EmptyState message="아직 등록된 후기가 없어요." />
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
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
