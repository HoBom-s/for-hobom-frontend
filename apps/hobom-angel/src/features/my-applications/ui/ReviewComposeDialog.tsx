import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { ApplicationSummary } from "@/entities/application";
import { useSubmitReview } from "../model/useSubmitReview";
import { styles } from "./MyApplications.styles";

const StarInput = ({ value, onChange }: { value: number; onChange: (rating: number) => void }) => (
  <div {...stylex.props(styles.stars)} role="radiogroup" aria-label="별점">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        {...stylex.props(styles.star, n <= value && styles.starOn)}
        onClick={() => onChange(n)}
        aria-label={`${n}점`}
        aria-pressed={value === n}
      >
        ★
      </button>
    ))}
  </div>
);

interface ReviewComposeDialogProps {
  application: ApplicationSummary;
  animalName: string;
  onClose: () => void;
}

/** Write a review for a completed adoption/foster, anchored to that placement. */
export const ReviewComposeDialog = ({
  application,
  animalName,
  onClose,
}: ReviewComposeDialogProps) => {
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const { submit, submitting } = useSubmitReview(onClose);

  const canSubmit = body.trim().length > 0 && !submitting;

  const onSubmit = () => {
    if (!canSubmit) return;

    submit(application.shelterId, {
      placementType: application.kind,
      placementRef: application.id,
      rating,
      body: body.trim(),
    });
  };

  return (
    <Hb.Dialog.Root open onClose={onClose} size="sm">
      <Hb.Dialog.Title>후기 남기기</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <p {...stylex.props(styles.composeIntro)}>{animalName}와 함께한 경험을 들려주세요.</p>
        <StarInput value={rating} onChange={setRating} />
        <Hb.TextField
          placeholder="보호소와의 경험, 아이의 근황을 자유롭게 남겨주세요"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          multiline
          minRows={4}
          fullWidth
          autoFocus
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button variant="ghost" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button variant="primary" onClick={onSubmit} disabled={!canSubmit} loading={submitting}>
          등록
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
