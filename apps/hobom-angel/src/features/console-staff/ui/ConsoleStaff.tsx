import * as stylex from "@stylexjs/stylex";
import type { StaffPromotionRequest } from "@/entities/shelter";
import { useOverlay } from "@/shared/model";
import { useConsoleStaff } from "../model/useConsoleStaff";
import { StaffRoster } from "./StaffRoster";
import { StaffPromotionQueue } from "./StaffPromotionQueue";
import { RejectReasonDialog } from "./RejectReasonDialog";
import { styles } from "./ConsoleStaff.styles";

/** §7.6 스태프 관리 — the roster on the left, the pending 승격 요청 queue on the
 *  right. Scoped to the staff member's shelter. */
export const ConsoleStaff = ({ shelterId }: { shelterId: string }) => {
  const { members, pending, approve, reject, deciding } = useConsoleStaff(shelterId);
  const overlay = useOverlay();

  const promptReject = (request: StaffPromotionRequest) =>
    overlay.open(({ close }) => (
      <RejectReasonDialog
        candidateNickname={request.candidateNickname}
        onConfirm={(reason) => reject(request.approvalId, reason)}
        onClose={close}
      />
    ));

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <p {...stylex.props(styles.kicker)}>
          <span {...stylex.props(styles.kickerRule)} aria-hidden />
          보호소 콘솔
        </p>
        <h1 {...stylex.props(styles.title)}>스태프 관리</h1>
        <p {...stylex.props(styles.subtitle)}>일반회원 승격 요청·승인(승인 주체=보호소 대표) · 역할</p>
      </header>

      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.col)}>
          <StaffRoster members={members} />
        </div>
        <div {...stylex.props(styles.col)}>
          <StaffPromotionQueue
            pending={pending}
            onApprove={approve}
            onReject={promptReject}
            deciding={deciding}
          />
        </div>
      </div>
    </div>
  );
};
