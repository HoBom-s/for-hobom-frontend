import { useNavigate } from "react-router-dom";
import { useMutation, useDataLot } from "hobom-data";
import { authMutations } from "@/entities/auth";
import { userQueries } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { useToast } from "@/shared/model";

/** Log out: revoke the session server-side, drop the cached session, go home. */
export const useLogout = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openSuccessToast } = useToast();

  return useMutation({
    ...authMutations.logout(),
    onSuccess: () => {
      openSuccessToast({ message: "로그아웃했어요." });

      void dataLot.invalidateQueries(userQueries.me());
      void navigate(ROUTES.HOME, { replace: true });
    },
  });
};
