import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { StaffPromotionRequest } from "@/entities/shelter";
import { candidateMeta } from "../lib/staff.lib";
import { styles } from "./ConsoleStaff.styles";

interface StaffPromotionQueueProps {
  pending: StaffPromotionRequest[];
  onApprove: (approvalId: string) => void;
  onReject: (request: StaffPromotionRequest) => void;
  deciding: boolean;
}

/** The pending 승격 요청 queue — approve, or reject with a reason. Only the
 *  representative can decide, but the whole staff sees the queue. */
export const StaffPromotionQueue = ({
  pending,
  onApprove,
  onReject,
  deciding,
}: StaffPromotionQueueProps) => {
  const now = new Date();

  return (
    <div>
      <h2 {...stylex.props(styles.count)}>
        승격 요청 <span {...stylex.props(styles.countNum)}>{pending.length}</span>
      </h2>
      <p {...stylex.props(styles.panelSubtitle)}>일반회원 → 스태프 · 승인 주체: 보호소 대표</p>

      {pending.length === 0 ? (
        <p {...stylex.props(styles.empty)}>대기 중인 승격 요청이 없어요.</p>
      ) : (
        <div {...stylex.props(styles.list)}>
          {pending.map((request) => (
            <div key={request.approvalId} {...stylex.props(styles.member)}>
              <span {...stylex.props(styles.avatar)} aria-hidden>
                {request.candidateNickname.charAt(0)}
              </span>
              <span {...stylex.props(styles.memberMain)}>
                <span {...stylex.props(styles.nickname)}>{request.candidateNickname}</span>
                <span {...stylex.props(styles.requestMeta)}>{candidateMeta(request, now)}</span>
              </span>
              <span {...stylex.props(styles.requestActions)}>
                <Hb.Button
                  variant="primary"
                  size="small"
                  onClick={() => onApprove(request.approvalId)}
                  disabled={deciding}
                >
                  승인
                </Hb.Button>
                <Hb.Button
                  variant="ghost"
                  size="small"
                  onClick={() => onReject(request)}
                  disabled={deciding}
                >
                  반려
                </Hb.Button>
              </span>
            </div>
          ))}
        </div>
      )}

      <p {...stylex.props(styles.note)}>
        신뢰 위임: 플랫폼이 대표를 문서 심사로 검증하고, 대표가 스태프를 승인해요. 별도 KYC 없이 권한이
        부여됩니다.
      </p>
    </div>
  );
};
