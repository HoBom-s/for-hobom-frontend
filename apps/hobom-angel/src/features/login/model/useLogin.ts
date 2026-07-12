import { useNavigate } from "react-router-dom";
import { useMutation } from "hobom-data";
import { authMutations } from "@/entities/auth";
import { HttpError } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { useToast } from "@/shared/model";

/** Login submission (email + password → session), with toast + redirect home. */
export const useLogin = () => {
  const navigate = useNavigate();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...authMutations.login(),
    onSuccess: () => {
      openSuccessToast({ message: "로그인했어요." });

      void navigate(ROUTES.HOME);
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
