import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { Review, ReviseReviewInput } from "@/entities/review";
import { styles } from "./ReviewsTab.styles";

interface ReviewEditDialogProps {
  review: Review;
  submitting: boolean;
  onConfirm: (input: ReviseReviewInput) => void;
  onClose: () => void;
}

/** Edit one of the viewer's own reviews — rating + body, prefilled. */
export const ReviewEditDialog = ({
  review,
  submitting,
  onConfirm,
  onClose,
}: ReviewEditDialogProps) => {
  const [rating, setRating] = useState(review.rating);
  const [body, setBody] = useState(review.body);
  const canSubmit = rating >= 1 && body.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;

    onConfirm({ rating, body: body.trim() });
    onClose();
  };

  return (
    <Hb.Dialog.Root open onClose={onClose} size="xs">
      <Hb.Dialog.Title>후기 수정</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <div {...stylex.props(styles.editStars)} role="radiogroup" aria-label="별점">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              {...stylex.props(styles.editStar, n <= rating && styles.editStarOn)}
              onClick={() => setRating(n)}
              role="radio"
              aria-label={`${n}점`}
              aria-checked={rating === n}
            >
              ★
            </button>
          ))}
        </div>
        <Hb.TextField
          label="후기"
          placeholder="보호소와의 경험, 아이의 근황을 자유롭게 남겨주세요"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          multiline
          minRows={4}
          fullWidth
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button variant="ghost" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button variant="primary" onClick={submit} disabled={!canSubmit} loading={submitting}>
          저장
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
