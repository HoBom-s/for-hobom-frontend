import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useAddMember = () => {
  const dataLot = useDataLot();
  const { openSuccessToast } = useToast();

  return useMutation({
    ...projectMutations.addMember(),
    onSuccess: (_, variables) => {
      void dataLot.invalidateQueries(projectQueries.detail(variables.projectId));
      openSuccessToast({ message: "멤버를 추가했어요" });
    },
  });
};
