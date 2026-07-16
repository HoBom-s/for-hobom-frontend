import { useDataLot, useMutation } from "hobom-data";
import { changeNickname, userQueries } from "@/entities/user";
import { useToast } from "@/shared/model";

/** Change the nickname, then refetch the profile so the UI reflects it. */
export const useChangeNickname = (onDone?: () => void) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    mutationFn: (nickname: string) => changeNickname(nickname),
    onSuccess: () => {
      openSuccessToast({ message: "닉네임을 변경했어요." });
      void dataLot.invalidateQueries(userQueries.me());
      onDone?.();
    },
    onError: (error: unknown) =>
      openErrorToast({ message: error instanceof Error ? error.message : "변경에 실패했어요." }),
  });
};
