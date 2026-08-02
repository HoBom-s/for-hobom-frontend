import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { useInfiniteScroll, useOverlay } from "@/shared/model";
import type { ApprovalType, PendingApproval } from "@/entities/approval";
import { usePendingApprovals } from "../model/usePendingApprovals";
import {
  approvalContextLine,
  approvalHeadline,
  formatApprovalDate,
  maskRequester,
  subjectTag,
} from "../lib/approval-format.lib";
import { ApprovalRejectDialog } from "./ApprovalRejectDialog";
import { styles } from "./OperatorApprovals.styles";

/** §09 승인 큐 — one approval type's pending list with approve / reject. */
export const PendingApprovalQueue = ({ type }: { type: ApprovalType }) => {
  const { approvals, decide, deciding, hasNextPage, isFetchingNextPage, fetchNextPage } =
    usePendingApprovals(type);
  const overlay = useOverlay();

  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  const promptReject = (approval: PendingApproval) =>
    overlay.open(({ close }) => (
      <ApprovalRejectDialog
        headline={approvalHeadline(approval.type)}
        onConfirm={(reason) => {
          decide(approval.approvalId, { decision: "REJECT", reason });
        }}
        onClose={close}
      />
    ));

  if (approvals.length === 0) {
    return <p {...stylex.props(styles.empty)}>대기 중인 요청이 없어요.</p>;
  }

  return (
    <div {...stylex.props(styles.list)}>
      {approvals.map((approval) => {
        const contextLine = approvalContextLine(approval);
        const date = formatApprovalDate(approval.createdAt);

        return (
          <article key={approval.approvalId} {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.cardHead)}>
              <span {...stylex.props(styles.headline)}>{approvalHeadline(approval.type)}</span>
              <span {...stylex.props(styles.spacer)} />
              <span {...stylex.props(styles.actions)}>
                <Hb.Button
                  variant="primary"
                  size="small"
                  onClick={() => decide(approval.approvalId, { decision: "APPROVE" })}
                  disabled={deciding}
                >
                  승인
                </Hb.Button>
                <Hb.Button
                  variant="ghost"
                  size="small"
                  onClick={() => promptReject(approval)}
                  disabled={deciding}
                >
                  반려
                </Hb.Button>
              </span>
            </div>
            <div {...stylex.props(styles.meta)}>
              <span>{subjectTag(approval)}</span>
              {contextLine && <span>{contextLine}</span>}
              <span>{maskRequester(approval.requesterId)}</span>
              {date && <span>{date}</span>}
            </div>
          </article>
        );
      })}
      {hasNextPage && <div ref={sentinelRef} aria-hidden />}
    </div>
  );
};
