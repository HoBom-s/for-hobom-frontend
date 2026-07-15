import { useDataLot, useMutation } from "hobom-data";
import { signUpForVolunteerEvent, volunteerEventQueries } from "@/entities/volunteer-event";
import { useToast } from "@/shared/model";

/** Sign up for a volunteer event; refreshes the list count and toasts the
 *  result. `pendingEventId` marks which card's button is busy. */
export const useVolunteerSignup = () => {
  const { openSuccessToast, openErrorToast } = useToast();
  const dataLot = useDataLot();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (eventId: string) => signUpForVolunteerEvent(eventId),
    onSuccess: () => {
      openSuccessToast({ message: "봉사 신청이 접수됐어요." });
      void dataLot.invalidateQueries(volunteerEventQueries.upcoming());
    },
    onError: (error: unknown) =>
      openErrorToast({
        message: error instanceof Error ? error.message : "신청에 실패했어요.",
      }),
  });

  return { signUp: mutate, pendingEventId: isPending ? variables : undefined };
};
