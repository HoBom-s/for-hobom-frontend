import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import {
  volunteerCertificateMutations,
  volunteerCertificateQueries,
} from "@/entities/volunteer-certificate";
import { useToast } from "@/shared/model";

/** The volunteer's certificates plus the issue action, which reflects the new
 *  one into the list. Issuing requires completed participations (server-checked;
 *  a 4xx surfaces as a toast). */
export const useVolunteerCertificates = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const options = volunteerCertificateQueries.mine();
  const { data: certificates } = useSuspenseQuery(options);

  const issue = useMutation({
    ...volunteerCertificateMutations.issue(),
    onSuccess: () => {
      openSuccessToast({ message: "확인서를 발급했어요." });
      void dataLot.invalidateQueries(options);
    },
    onError: (error: Error) =>
      openErrorToast({ message: error.message || "발급할 수 있는 완료된 봉사가 없어요." }),
  });

  return {
    certificates,
    issue: () => issue.mutate(),
    issuing: issue.isPending,
  };
};
