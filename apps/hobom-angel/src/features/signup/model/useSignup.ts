import { useNavigate } from "react-router-dom";
import { useMutation } from "hobom-data";
import { authMutations } from "@/entities/auth";
import { HttpError } from "@/shared/api";
import { useToast } from "@/shared/model";

/** Signup submission (email + password + profile → session), with toast + redirect home. */
export const useSignup = () => {
  const navigate = useNavigate();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...authMutations.signup(),
    onSuccess: () => {
      openSuccessToast({ message: "가입이 완료됐어요. 환영해요!" });

      void navigate("/");
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
