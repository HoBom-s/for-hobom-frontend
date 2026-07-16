import { useDataLot, useMutation } from "hobom-data";
import {
  signUpForVolunteerEvent,
  volunteerEventQueries,
  withdrawVolunteerSignup,
} from "@/entities/volunteer-event";
import { useToast } from "@/shared/model";

export interface VolunteerSignupControls {
  signUp: (eventId: string) => void;
  withdraw: (signupId: string) => void;
  /** Event id whose signup is in flight (for the CTA spinner), if any. */
  pendingSignUpId: string | undefined;
  /** Signup id whose withdrawal is in flight, if any. */
  pendingWithdrawId: string | undefined;
}

/** Sign up for / withdraw from volunteer events. The signup identity lives on the
 *  server — event reads carry the viewer's own `mySignupId`/`mySignupStatus` — so
 *  both mutations just invalidate the event cache and let the refetch re-derive
 *  the button state. No client-side mirror of server state. */
export const useVolunteerSignup = (): VolunteerSignupControls => {
  const { openSuccessToast, openErrorToast } = useToast();
  const dataLot = useDataLot();

  const refresh = () => dataLot.invalidateQueries(volunteerEventQueries.upcoming());
  const toastError = (error: unknown, fallback: string) =>
    openErrorToast({ message: error instanceof Error ? error.message : fallback });

  const signUp = useMutation({
    mutationFn: (eventId: string) => signUpForVolunteerEvent(eventId),
    onSuccess: () => {
      openSuccessToast({ message: "봉사 신청이 접수됐어요." });
      void refresh();
    },
    onError: (error: unknown) => toastError(error, "신청에 실패했어요."),
  });

  const withdraw = useMutation({
    mutationFn: (signupId: string) => withdrawVolunteerSignup(signupId),
    onSuccess: () => {
      openSuccessToast({ message: "신청을 취소했어요." });
      void refresh();
    },
    onError: (error: unknown) => toastError(error, "취소에 실패했어요."),
  });

  return {
    signUp: signUp.mutate,
    withdraw: withdraw.mutate,
    pendingSignUpId: signUp.isPending ? signUp.variables : undefined,
    pendingWithdrawId: withdraw.isPending ? withdraw.variables : undefined,
  };
};
