import { useNavigate } from "react-router";
import { useMutation, useDataLot } from "hobom-data";
import { authMutations } from "@/entities/auth";
import { userQueries } from "@/entities/user";
import { HttpError } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { useToast } from "@/shared/model";

/** Signup submission (email + password + profile → session), with toast + redirect home. */
export const useSignup = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...authMutations.signup(),
    onSuccess: () => {
      openSuccessToast({ message: "가입이 완료됐어요. 환영해요!" });

      // Refresh the session so the app reflects the newly signed-in user.
      void dataLot.invalidateQueries(userQueries.me());
      // replace so Back doesn't return to the signup funnel after joining.
      void navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error) => {
      openErrorToast({
        message:
          error instanceof HttpError
            ? error.message
            : "가입에 실패했어요. 잠시 후 다시 시도해주세요.",
      });
    },
  });
};
