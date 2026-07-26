import { useNavigate } from "react-router-dom";
import { useMutation, useDataLot } from "hobom-data";
import { authMutations } from "@/entities/auth";
import { userQueries } from "@/entities/user";
import { HttpError } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { useToast } from "@/shared/model";

/** Login submission (email + password → session), with toast + redirect home. */
export const useLogin = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...authMutations.login(),
    onSuccess: () => {
      openSuccessToast({ message: "로그인했어요." });

      // Refresh the session so the app reflects the newly signed-in user.
      void dataLot.invalidateQueries(userQueries.me());
      // replace so Back doesn't return to the login form after signing in.
      void navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error) => {
      openErrorToast({
        message:
          error instanceof HttpError
            ? error.message
            : "로그인에 실패했어요. 잠시 후 다시 시도해주세요.",
      });
    },
  });
};
