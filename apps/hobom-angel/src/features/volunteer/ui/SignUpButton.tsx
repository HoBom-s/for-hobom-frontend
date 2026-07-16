import { ConfirmDialog, Hb } from "hobom-design-system";
import { VOLUNTEER_STATUS_LABEL, isSignUpOpen } from "@/entities/volunteer-event";
import { useOverlay } from "@/shared/model";
import type { VolunteerEvent } from "@/entities/volunteer-event";
import type { VolunteerSignupControls } from "../model/useVolunteerSignup";

interface SignUpButtonProps {
  event: VolunteerEvent;
  controls: VolunteerSignupControls;
  fullWidth?: boolean;
  /** Called after an action is confirmed — e.g. to close a host dialog. */
  onAfter?: () => void;
}

/** The sign-up CTA in its three states (신청 취소 / 봉사 신청하기 / 마감), each
 *  guarded by a confirmation since signing up and withdrawing are commitments. */
export const SignUpButton = ({
  event,
  controls,
  fullWidth = false,
  onAfter,
}: SignUpButtonProps) => {
  const overlay = useOverlay();

  const confirmSignUp = () =>
    overlay.open(({ close }) => (
      <ConfirmDialog
        open
        onClose={close}
        title="이 봉사에 신청할까요?"
        description={`'${event.title}' 일정에 참여를 신청할게요.`}
        confirmLabel="신청하기"
        onConfirm={() => {
          controls.signUp(event.id);
          close();
          onAfter?.();
        }}
      />
    ));

  const confirmWithdraw = (signupId: string) =>
    overlay.open(({ close }) => (
      <ConfirmDialog
        open
        onClose={close}
        title="신청을 취소할까요?"
        description={`'${event.title}' 신청을 취소할게요.`}
        confirmLabel="취소하기"
        confirmColor="error"
        onConfirm={() => {
          controls.withdraw(signupId);
          close();
          onAfter?.();
        }}
      />
    ));

  const signupId = event.mySignupId;

  if (signupId) {
    return (
      <Hb.Button
        variant="secondary"
        fullWidth={fullWidth}
        loading={controls.pendingWithdrawId === signupId}
        onClick={() => confirmWithdraw(signupId)}
      >
        신청 취소
      </Hb.Button>
    );
  }

  if (isSignUpOpen(event)) {
    return (
      <Hb.Button
        variant="primary"
        fullWidth={fullWidth}
        loading={controls.pendingSignUpId === event.id}
        onClick={confirmSignUp}
      >
        봉사 신청하기
      </Hb.Button>
    );
  }

  return (
    <Hb.Button variant="primary" fullWidth={fullWidth} disabled>
      {VOLUNTEER_STATUS_LABEL[event.status]}
    </Hb.Button>
  );
};
