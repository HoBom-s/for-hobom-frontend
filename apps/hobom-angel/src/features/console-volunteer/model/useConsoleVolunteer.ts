import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { volunteerEventMutations, volunteerEventQueries } from "@/entities/volunteer-event";
import { useToast } from "@/shared/model";
import type { CreateVolunteerEventInput } from "@/entities/volunteer-event";

/** The console's volunteer schedule for a shelter: the event list plus create /
 *  cancel, invalidating the list so counts and status stay fresh. */
export const useConsoleVolunteer = (shelterId: string) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();
  const listOptions = volunteerEventQueries.byShelter(shelterId);

  const { data: events } = useSuspenseQuery(listOptions);

  const refresh = () => void dataLot.invalidateQueries(listOptions);

  const create = useMutation({
    ...volunteerEventMutations.create(shelterId),
    onSuccess: () => {
      openSuccessToast({ message: "봉사 일정을 게시했어요." });
      refresh();
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "게시에 실패했어요." }),
  });

  const cancel = useMutation({
    ...volunteerEventMutations.cancel(),
    onSuccess: () => {
      openSuccessToast({ message: "봉사 일정을 취소했어요." });
      refresh();
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "취소에 실패했어요." }),
  });

  return {
    events,
    createEvent: (input: CreateVolunteerEventInput) => create.mutate(input),
    creating: create.isPending,
    cancelEvent: (eventId: string) => cancel.mutate(eventId),
  };
};
