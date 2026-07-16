import { useNavigate } from "react-router-dom";
import { useDataLot, useMutation } from "hobom-data";
import { userQueries, withdrawAccount } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { useToast } from "@/shared/model";

/** Withdraw the account, drop the cached session, and return home. */
export const useWithdrawAccount = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    mutationFn: () => withdrawAccount(),
    onSuccess: () => {
      openSuccessToast({ message: "그동안 이용해 주셔서 감사해요." });
      void dataLot.invalidateQueries(userQueries.me());
      void navigate(ROUTES.HOME, { replace: true });
    },
    onError: (error: unknown) =>
      openErrorToast({ message: error instanceof Error ? error.message : "탈퇴에 실패했어요." }),
  });
};
