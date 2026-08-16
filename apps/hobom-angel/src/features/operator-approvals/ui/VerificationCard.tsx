import * as stylex from "@stylexjs/stylex";
import { useQuery } from "hobom-data";
import { Hb } from "hobom-design-system";
import { shelterQueries } from "@/entities/shelter";
import type { PendingApproval } from "@/entities/approval";
import { formatApprovalDate } from "../lib/approval-format.lib";
import { styles } from "./OperatorApprovals.styles";

interface VerificationCardProps {
  approval: PendingApproval;
  deciding: boolean;
  onReview: (approval: PendingApproval) => void;
}

/** One pending shelter-verification row. Loads the dossier (non-suspense) so the
 *  card shows the shelter's name and its registrant rather than raw ids — and a
 *  failed load degrades this one card instead of crashing the queue. The fetch
 *  is cached, so 심사하기 opens the dialog with it already in hand. */
export const VerificationCard = ({ approval, deciding, onReview }: VerificationCardProps) => {
  const { data, status } = useQuery(shelterQueries.verification(approval.subjectRef));
  const date = formatApprovalDate(approval.createdAt);

  if (status === "pending") {
    return <div {...stylex.props(styles.cardSkeleton)} aria-hidden />;
  }

  return (
    <article {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.cardHead)}>
        <span {...stylex.props(styles.headline)}>{data?.name ?? "보호소 검증 요청"}</span>
        <span {...stylex.props(styles.spacer)} />
        <Hb.Button
          variant="primary"
          size="small"
          onClick={() => onReview(approval)}
          disabled={deciding}
        >
          심사하기
        </Hb.Button>
      </div>
      <div {...stylex.props(styles.meta)}>
        {data ? (
          <>
            <span>/{data.slug}</span>
            {data.registrant && <span>요청자 {data.registrant.nickname}</span>}
          </>
        ) : (
          <span>요청 #{approval.subjectRef.slice(-6)}</span>
        )}
        {date && <span>{date}</span>}
      </div>
    </article>
  );
};
