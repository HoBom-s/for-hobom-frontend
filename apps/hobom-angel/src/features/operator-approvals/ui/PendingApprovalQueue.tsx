import * as stylex from "@stylexjs/stylex";
import { useInfiniteScroll, useOverlay } from "@/shared/model";
import type { ApprovalType, PendingApproval } from "@/entities/approval";
import { usePendingApprovals } from "../model/usePendingApprovals";
import { VerificationCard } from "./VerificationCard";
import { ShelterVerificationDialog } from "./ShelterVerificationDialog";
import { styles } from "./OperatorApprovals.styles";

/** §09 승인 큐 — the shelter-verification pending list. Each card loads its
 *  dossier (name + registrant); reviewing opens it in a dialog to decide. */
export const PendingApprovalQueue = ({ type }: { type: ApprovalType }) => {
  const { approvals, decide, deciding, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePendingApprovals(type);
  const overlay = useOverlay();

  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const review = (approval: PendingApproval) =>
    overlay.open(({ close }) => (
      <ShelterVerificationDialog
        shelterId={approval.subjectRef}
        deciding={deciding}
        onApprove={() => {
          decide(approval.approvalId, { decision: "APPROVE" });
          close();
        }}
        onReject={(reason) => {
          decide(approval.approvalId, { decision: "REJECT", reason });
          close();
        }}
        onClose={close}
      />
    ));

  if (approvals.length === 0) {
    return <p {...stylex.props(styles.empty)}>대기 중인 요청이 없어요.</p>;
  }

  return (
    <div {...stylex.props(styles.list)}>
      {approvals.map((approval) => (
        <VerificationCard
          key={approval.approvalId}
          approval={approval}
          deciding={deciding}
          onReview={review}
        />
      ))}
      {hasNextPage && <div ref={sentinelRef} aria-hidden />}
    </div>
  );
};
