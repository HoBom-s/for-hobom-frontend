import { useDataLot, useMutation, useQuery } from "hobom-data";
import { volunteerEventMutations, volunteerEventQueries } from "@/entities/volunteer-event";
import { useToast } from "@/shared/model";

/** An event's applicants plus approve / reject. A decision invalidates the whole
 *  volunteer-event cache so the applicant list and the event's counts refresh. */
export const useEventApplicants = (eventId: string) => {
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();

  const { data: applicants, status } = useQuery(volunteerEventQueries.applicants(eventId));

  const decide = useMutation({
    ...volunteerEventMutations.decideSignup(),
    onSuccess: () => void dataLot.invalidateQueries({ queryKey: volunteerEventQueries.all() }),
    onError: (error: Error) => openErrorToast({ message: error.message || "처리에 실패했어요." }),
  });

  return {
    applicants: applicants ?? [],
    loading: status === "pending",
    approve: (signupId: string) => decide.mutate({ signupId, decision: "APPROVE" }),
    reject: (signupId: string) => decide.mutate({ signupId, decision: "REJECT" }),
    deciding: decide.isPending,
  };
};
